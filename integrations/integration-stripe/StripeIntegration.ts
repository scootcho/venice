import type {IntegrationDef, IntegrationImpl} from '@usevenice/cdk-core'
import {defHelpers, handlersLink} from '@usevenice/cdk-core'
import {
  makePostingsMap,
  veniceProviderBase,
  zCommon,
} from '@usevenice/cdk-ledger'
import {A, Rx, rxjs, z, zCast} from '@usevenice/util'

import type {components} from './stripe.gen'
import {makeStripeClient} from './StripeClient'

const stripeDef = {
  name: z.literal('stripe'),
  integrationConfig: z.object({}),
  resourceSettings: z.object({secretKey: z.string()}),
  sourceOutputEntity: z.discriminatedUnion('entityName', [
    z.object({
      id: z.string(),
      entityName: z.literal('account'),
      entity: zCast<components['schemas']['account']>(),
    }),
    z.object({
      id: z.string(),
      entityName: z.literal('transaction'),
      entity: zCast<components['schemas']['balance_transaction']>(),
    }),
  ]),
  sourceState: veniceProviderBase.def.sourceState
    .removeDefault()
    .extend({transactionSyncCursor: z.string().nullish()})
    .default({}),
  destinationInputEntity: zCommon.Entity,
} satisfies IntegrationDef

const helpers = defHelpers(stripeDef)

export const stripeImpl = {
  name: 'stripe',
  metadata: {
    categories: ['commerce'],
    logoUrl: '/_assets/logo-stripe.png',
    stage: 'beta',
  },
  def: stripeDef,
  helpers,
  extension: {
    sourceMapEntity: {
      account: ({entity: a}) => ({
        id: a.id,
        entityName: 'account',
        entity: {
          name: a.settings?.dashboard.display_name ?? '',
          type: 'asset/digital_wallet',
          institutionName: a.settings?.payments.statement_descriptor,
          defaultUnit: a.default_currency?.toUpperCase() as Unit,
          // informationalBalances: {
          //   available: A(
          //     a.balance?.available[0]?.amount ?? 0,
          //     a.default_currency?.toUpperCase() as Unit,
          //   ),
          // },
        },
      }),
      transaction: ({entity: t}) => ({
        id: t.id,
        entityName: 'transaction',
        entity: {
          date: new Date(t.created).toISOString(),
          description: t.description ?? '',
          postingsMap: makePostingsMap({
            main: {
              accountExternalId: t.source as ExternalId,
              amount: A(t.amount, t.currency as Unit),
            },
          }),
        },
      }),
    },
  },

  sourceSync: ({settings, state}) => {
    const client = makeStripeClient({apiKey: settings.secretKey})
    async function* iterateEntities() {
      const accountRes = await client.get('/v1/accounts', {})
      // const balanceRes = await client.get('/v1/balance', {})

      yield accountRes.data.map((a) => helpers._opData('account', a.id, a))

      let starting_after = state.transactionSyncCursor ?? undefined
      while (true) {
        const res2 = await client.get('/v1/balance_transactions', {
          query: {
            starting_after:
              starting_after && starting_after.length > 0
                ? starting_after
                : undefined,
          },
        })
        starting_after = res2.data[res2.data.length - 1]?.id ?? ''
        yield [...res2.data.map((t) => helpers._opData('transaction', t.id, t))]
        // TODO: Need to check what can we use for retrieving meta data
        if (!res2.has_more) {
          break
        }
      }
    }

    return rxjs
      .from(iterateEntities())
      .pipe(Rx.mergeMap((ops) => rxjs.from([...ops, helpers._op('commit')])))
  },

  destinationSync: ({settings}) => {
    const client = makeStripeClient({apiKey: settings.secretKey})

    return handlersLink({
      data: async (op) => {
        const {data} = op

        if (data.entityName === 'invoice' && data.entity) {
          const entity = data.entity

          let invoice = await client
            .get('/v1/invoices/search', {
              query: {query: `metadata['entityId']:'${entity.id}'`},
            })
            .then((r) => r.data[0])
          if (invoice) {
            console.log('Skipping already created invoice', invoice.id)
            return op
          }

          const customer = await client
            .get('/v1/customers/search', {
              query: {query: `metadata['entityId']:'${entity.contact}'`},
            })
            .then(
              (r) =>
                r.data[0] ??
                client.post('/v1/customers', {
                  bodyForm: {metadata: {entityId: entity.contact!}},
                }),
            )

          // TODO: Handle update scenarios. Only dealing with soft deletes
          // should make this simpler
          // TODO: Gotta validate that the standard invoice before passing onto stripe
          // Most likely via a validator link in the middle
          invoice = await client.post('/v1/invoices', {
            bodyForm: {
              customer: customer.id,
              currency: entity.currency ?? undefined,
              // In stripe description is probably visible for users...
              // so it's an issue.
              description: entity.memo ?? undefined,
              metadata: {entityId: data.id},
            },
          })
          await Promise.all(
            (entity.line_items ?? []).map((line) =>
              client.post('/v1/invoiceitems', {
                bodyForm: {
                  metadata: {entityId: line.id},
                  invoice: invoice?.id,
                  customer: customer.id, // Technically redundant
                  description: line.description ?? undefined,
                  quantity: line.quantity ?? undefined,
                  unit_amount: line.unit_price ?? undefined,
                  // amount cannot be specified together with unit_amount
                  // amount: line.total_amount ?? undefined,
                },
              }),
            ),
          )
        }

        return op
      },
    })
  },
} satisfies IntegrationImpl<typeof stripeDef>
