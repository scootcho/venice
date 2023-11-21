 

import type {AnyConnectorImpl} from '@usevenice/cdk'

import {makeDBService} from './dbService'
import type {MetaService} from './metaService'
import {makeSyncService} from './sync-service'

export function makeServices({
  metaService,
  connectorMap,
}: {
  metaService: MetaService
  connectorMap: Record<string, AnyConnectorImpl>
  // TODO: Fix any type
}) {
  const dbService = makeDBService({
    metaService,
    connectorMap,
  })
  const syncService = makeSyncService({
    metaService,
    getPipelineExpandedOrFail: dbService.getPipelineExpandedOrFail,
    metaLinks: dbService.metaLinks,
  })
  return {...dbService, ...syncService}
}
