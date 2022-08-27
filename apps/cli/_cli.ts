// Not sure why ../node_modules import needed... was working before
import '@ledger-sync/app-config/register.node'
import {makeProxyAgentNext} from '@ledger-sync/app-config/utils.node'
import {makePostgresKVStore} from '@ledger-sync/core-integration-postgres'
import {makeOneBrickClient} from '@ledger-sync/integration-onebrick'
// Make this import dynamic at runtime, so we can do
// dynamic-cli plaid ......  or
// OBJ=$pathToPlaid dynamic-cli whatever...
// Or perhaps we can make it into a register and/or loader for nodejs
// much like tsx and others
import {makePlaidClient} from '@ledger-sync/integration-plaid'
import {makeRampClient} from '@ledger-sync/integration-ramp'
import {makeStripeClient} from '@ledger-sync/integration-stripe'
import {makeTellerClient} from '@ledger-sync/integration-teller'
import {makeTogglClient} from '@ledger-sync/integration-toggl'
import {makeWiseClient} from '@ledger-sync/integration-wise'
import {
  asFunction,
  kProxyAgent,
  R,
  registerDependency,
  safeJSONParse,
  z,
  ZFunctionMap,
  zodInsecureDebug,
} from '@ledger-sync/util'
import {cliFromZFunctionMap, CliOpts} from './cli-utils'

if (process.env['DEBUG_ZOD']) {
  zodInsecureDebug()
}

if (require.main === module) {
  registerDependency(
    kProxyAgent,
    asFunction(() =>
      makeProxyAgentNext({
        url: process.env['PROXY_URL'] ?? '',
        cert: process.env['PROXY_CERT'] ?? '',
      }),
    ).singleton(),
  )

  type ClientMap = Record<string, () => [ZFunctionMap, CliOpts] | ZFunctionMap>
  const clients: ClientMap = {
    pgKv: () =>
      makePostgresKVStore({
        databaseUrl: z.string().parse(process.env['POSTGRES_URL']),
      }) as unknown as ZFunctionMap,
    plaid: () =>
      makePlaidClient(safeJSONParse(process.env['PLAID_CREDENTIALS'])),
    onebrick: () =>
      makeOneBrickClient(safeJSONParse(process.env['ONEBRICK_CREDENTIALS'])),
    teller: () =>
      makeTellerClient(safeJSONParse(process.env['TELLER_CREDENTIALS'])),
    stripe: () =>
      makeStripeClient(safeJSONParse(process.env['STRIPE_CREDENTIALS'])),
    ramp: () => makeRampClient(safeJSONParse(process.env['RAMP_CONFIG'])),
    wise: () => makeWiseClient(safeJSONParse(process.env['WISE_CREDENTIALS'])),
    toggl: () =>
      makeTogglClient(safeJSONParse(process.env['TOGGL_CREDENTIALS'])),
  }

  const clientFactory = z
    .enum(Object.keys(clients) as [keyof typeof clients], {
      errorMap: () => ({message: `Invalid process.env.CLIENT`}),
    })
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .transform((key) => clients[key]!)
    .parse(process.env['CLIENT'])

  const [client, opts] = R.pipe(clientFactory(), (r) =>
    Array.isArray(r) ? r : [r],
  )

  cliFromZFunctionMap(client, opts).help().parse()
}
