// generated by _generateIntegrationLists.ts. Do not modify by hand
import {default as integrationAirtable} from '@usevenice/integration-airtable/def'
import {default as integrationBeancount} from '@usevenice/integration-beancount/def'
import {default as integrationBrex} from '@usevenice/integration-brex/def'
import {default as integrationDebug} from '@usevenice/integration-debug/def'
import {default as integrationFirebase} from '@usevenice/integration-firebase/def'
import {default as integrationForeceipt} from '@usevenice/integration-foreceipt/def'
import {default as integrationFs} from '@usevenice/integration-fs/def'
import {default as integrationHeron} from '@usevenice/integration-heron/def'
import {default as integrationLunchmoney} from '@usevenice/integration-lunchmoney/def'
import {default as integrationMercury} from '@usevenice/integration-mercury/def'
import {default as integrationMerge} from '@usevenice/integration-merge/def'
import {default as integrationMongodb} from '@usevenice/integration-mongodb/def'
import {default as integrationMoota} from '@usevenice/integration-moota/def'
import {default as integrationOnebrick} from '@usevenice/integration-onebrick/def'
import {default as integrationPlaid} from '@usevenice/integration-plaid/def'
import {default as integrationPostgres} from '@usevenice/integration-postgres/def'
import {default as integrationQbo} from '@usevenice/integration-qbo/def'
import {default as integrationRamp} from '@usevenice/integration-ramp/def'
import {default as integrationSaltedge} from '@usevenice/integration-saltedge/def'
import {default as integrationSplitwise} from '@usevenice/integration-splitwise/def'
import {default as integrationSpreadsheet} from '@usevenice/integration-spreadsheet/def'
import {default as integrationStripe} from '@usevenice/integration-stripe/def'
import {default as integrationTeller} from '@usevenice/integration-teller/def'
import {default as integrationToggl} from '@usevenice/integration-toggl/def'
import {default as integrationVenmo} from '@usevenice/integration-venmo/def'
import {default as integrationWebhook} from '@usevenice/integration-webhook/def'
import {default as integrationWise} from '@usevenice/integration-wise/def'
import {default as integrationYodlee} from '@usevenice/integration-yodlee/def'
import type {NonEmptyArray} from '@usevenice/util';
import { z} from '@usevenice/util'

export const defIntegrations = {
  airtable: integrationAirtable,
  beancount: integrationBeancount,
  brex: integrationBrex,
  debug: integrationDebug,
  firebase: integrationFirebase,
  foreceipt: integrationForeceipt,
  fs: integrationFs,
  heron: integrationHeron,
  lunchmoney: integrationLunchmoney,
  mercury: integrationMercury,
  merge: integrationMerge,
  mongodb: integrationMongodb,
  moota: integrationMoota,
  onebrick: integrationOnebrick,
  plaid: integrationPlaid,
  postgres: integrationPostgres,
  qbo: integrationQbo,
  ramp: integrationRamp,
  saltedge: integrationSaltedge,
  splitwise: integrationSplitwise,
  spreadsheet: integrationSpreadsheet,
  stripe: integrationStripe,
  teller: integrationTeller,
  toggl: integrationToggl,
  venmo: integrationVenmo,
  webhook: integrationWebhook,
  wise: integrationWise,
  yodlee: integrationYodlee,
}

// TODO: make sure to generate this
export const zProviderName = z.enum(
  Object.keys(defIntegrations) as NonEmptyArray<keyof typeof defIntegrations>,
)

export type ProviderName = z.infer<typeof zProviderName>
