import type {
  AnySyncProvider,
  Id,
  LinkFactory,
  MetaService,
} from '@ledger-sync/cdk-core'
import {extractId, makeId, zRaw} from '@ledger-sync/cdk-core'
import {
  castInput,
  deepMerge,
  identity,
  mapDeep,
  R,
  z,
  zGuard,
} from '@ledger-sync/util'

import type {SyncEngineConfig} from './makeSyncEngine'

// Four different types
// Generic Input / Input
// Generic Output / Output
// We implement all except Generic Output

export type ZInput = {
  [k in keyof typeof zInput]: z.infer<typeof zInput[k]>
}
export const zInput = (() => {
  const provider = z.string().brand<'provider'>()
  // zRaw also have a bunch of things such as ledgerId, envName, etc.
  // Do we want to worry about those?
  const integration = zRaw.integration
  const institution = zRaw.institution
  const connection = zRaw.connection.omit({standard: true}).extend({
    integration: integration.optional(),
    institution: institution.optional(),
  })
  const pipeline = zRaw.pipeline.extend({
    source: connection.optional(),
    destination: connection.optional(),
    watch: z.boolean().optional(),
  })
  return {provider, institution, integration, connection, pipeline}
})()

type _inferInput<T> = T extends z.ZodTypeAny ? z.input<T> : never

// Would be nice to improve the typing of this... Make stuff non-optional
/** https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types */
export type IntegrationInput<T extends AnySyncProvider = AnySyncProvider> =
  T extends AnySyncProvider
    ? {
        id: Id<T['name']>['int']
        config?: Partial<_inferInput<T['def']['integrationConfig']>>
      }
    : never

// Is there a way to infer this? Or would that be too much?
export type ConnectionInput<T extends AnySyncProvider = AnySyncProvider> =
  T extends AnySyncProvider
    ? {
        id: Id<T['name']>['conn']
        integrationId?: Id<T['name']>['int']
        integration?: IntegrationInput<T>
        settings?: Partial<_inferInput<T['def']['connectionSettings']>>
      }
    : never

export interface PipelineInput<
  PSrc extends AnySyncProvider = AnySyncProvider,
  PDest extends AnySyncProvider = AnySyncProvider,
  TLinks extends Record<string, LinkFactory> = {},
> {
  id: Id['pipe']
  source?: PSrc extends AnySyncProvider ? ConnectionInput<PSrc> : never
  sourceState?: PSrc extends AnySyncProvider
    ? Partial<_inferInput<PSrc['def']['sourceState']>>
    : never
  destination?: PDest extends AnySyncProvider ? ConnectionInput<PDest> : never
  destinationState?: PDest extends AnySyncProvider
    ? Partial<_inferInput<PDest['def']['destinationState']>>
    : never
  /** Used to initialize links */
  linkOptions?: Array<
    // prettier-ignore
    {
      [K in Extract<keyof TLinks, string>]: undefined extends Parameters<TLinks[K]>[0]
        ? [name: K, args: Parameters<TLinks[K]>[0]] | [name: K] | K
        : [name: K, args: Parameters<TLinks[K]>[0]]
    }[Extract<keyof TLinks, string>]
  >
  watch?: boolean
}

// Consider adding connectContextInput here...

export type ParsedConn = z.infer<ReturnType<typeof makeSyncParsers>['zConn']>
export type ParsedInt = z.infer<ReturnType<typeof makeSyncParsers>['zInt']>
export type ParsedPipeline = z.infer<
  ReturnType<typeof makeSyncParsers>['zPipeline']
>

export const zSyncOptions = z.object({
  /**
   * Remove `state` of connection and trigger a full resync
   */
  fullResync: z.boolean().nullish(),

  /**
   * Triggers provider to refresh data from its source
   * https://plaid.com/docs/api/products/transactions/#transactionsrefresh
   * This may also load historical transactions. For example,
   * Finicity treats historical transaction as premium service.
   */
  todo_upstreamRefresh: z.boolean().nullish(),

  // See coda's implmementation. Requires adding a new message to the sync protocol
  // to remove all data from a particular source_id
  todo_removeUnsyncedData: z.boolean().nullish(),
})

export function makeSyncParsers<
  TProviders extends AnySyncProvider[],
  TLinks extends Record<string, LinkFactory>,
>({
  providers,
  linkMap,
  getDefaultPipeline,
  getDefaultConfig,
  metaService: m, // Destructure can cause dependencies to be loaded...
}: Pick<
  SyncEngineConfig<TProviders, TLinks>,
  'providers' | 'linkMap' | 'getDefaultPipeline'
> & {
  getDefaultConfig: (
    name: TProviders[number]['name'],
    integrationId?: Id<TProviders[number]['name']>['int'],
  ) => TProviders[number]['def']['_types']['integrationConfig']
  metaService: MetaService
}) {
  const providerMap = R.mapToObj(providers, (p) => [p.name, p])

  const zProvider = zInput.provider.transform(
    zGuard((input) => {
      const provider =
        providerMap[input] ?? providerMap[extractId(input as never)[1]]
      if (!provider) {
        throw new Error(`${input} is not a valid provider name`)
      }
      return provider
    }),
  )

  const zInt = castInput(zInput.integration)<
    IntegrationInput<TProviders[number]>
  >().transform(
    zGuard(async ({id, ...input}) => {
      const integration = await m.tables.integration.get(id)
      const provider = zProvider.parse(id, {path: ['id']})
      const _config = deepMerge(
        getDefaultConfig(provider.name, id),
        integration?.config,
        input.config,
      )
      const config = provider.def.integrationConfig?.parse(_config, {
        path: ['config'],
      })
      return {...integration, ...input, id, provider, config}
    }),
  )

  const zIns = zInput.institution.transform(
    zGuard(async ({id, ...input}) => {
      const institution = await m.tables.institution.get(id)
      const provider = zProvider.parse(id, {path: ['id']})
      const external = deepMerge(institution?.external, input.external)
      const standard = provider.def.institutionData?.parse(external, {
        path: ['external'],
      })
      return {...institution, ...input, id, external, standard}
    }),
  )

  const zConn = castInput(zInput.connection)<
    ConnectionInput<TProviders[number]>
  >().transform(
    zGuard(async ({id, ...input}) => {
      const conn = await m.tables.connection.get(id)
      const [integration, institution] = await Promise.all([
        zInt.parseAsync(
          identity<z.infer<typeof zInput['integration']>>({
            id:
              conn?.integrationId ??
              input.integrationId ??
              makeId('int', extractId(id)[1], ''),
            config: input.integration?.config,
          }),
        ),
        zIns.optional().parseAsync(
          identity<z.infer<typeof zInput['institution']>>({
            id:
              conn?.institutionId ??
              input.institutionId ??
              makeId('ins', extractId(id)[1], ''),
            external: input.institution?.external,
          }),
        ),
      ])
      const settings = integration.provider.def.connectionSettings?.parse(
        deepMerge(conn?.settings, input.settings),
        {path: ['settings']},
      )
      return {
        ...conn,
        ...input,
        id,
        integration,
        integrationId: integration.id, // Ensure consistency
        institution,
        institutionId: institution?.id,
        settings,
      }
    }),
  )

  const zPipeline = z
    .preprocess((arg) => {
      const defaultPipe = getDefaultPipeline?.()
      return !arg
        ? defaultPipe
        : typeof arg === 'object'
        ? deepMerge(defaultPipe, arg)
        : arg
    }, castInput(zInput.pipeline)<PipelineInput<TProviders[number], TProviders[number], TLinks>>())
    .transform(
      zGuard(async ({id, ...input}) => {
        const pipeline = await m.tables.pipeline.get(id)
        const [source, destination] = await Promise.all([
          zConn.parseAsync(
            deepMerge({id: input.sourceId ?? pipeline?.sourceId}, input.source),
            {path: ['source']},
          ),
          zConn.parseAsync(
            deepMerge(
              {id: input.destinationId ?? pipeline?.destinationId},
              input.destination,
            ),
            {path: ['destination']},
          ),
        ])
        // Validation happens inside for now
        const links = R.pipe(
          input.linkOptions ?? pipeline?.linkOptions ?? [],
          R.map((l) =>
            typeof l === 'string'
              ? linkMap?.[l]?.(undefined)
              : linkMap?.[l[0]]?.(l[1]),
          ),
          R.compact,
        )
        const sourceState = source.integration.provider.def.sourceState?.parse(
          deepMerge(pipeline?.sourceState, input.sourceState),
          {path: ['sourceState']},
        )

        const destinationState =
          destination.integration.provider.def.destinationState?.parse(
            deepMerge(pipeline?.destinationState, input.destinationState),
            {path: ['destinationState']},
          )
        return {
          ...pipeline,
          ...input,
          id,
          source,
          sourceId: source.id, // Ensure consistency
          destination,
          destinationId: destination.id, // Ensure consistency
          links,
          sourceState,
          destinationState,
          watch: input.watch, // Should this be on pipeline too?
        }
      }),
    )
    .refine((pipe) => {
      console.dir(
        mapDeep(pipe, (v, k) =>
          k === 'provider'
            ? (v as AnySyncProvider).name
            : `${k}`.toLowerCase().includes('secret')
            ? '[redacted]'
            : v,
        ),
        {depth: null},
      )
      return true
    })

  return {zProvider, zInt, zIns, zConn, zPipeline}
}
