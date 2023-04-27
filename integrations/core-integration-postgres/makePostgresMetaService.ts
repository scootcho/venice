import type {
  EndUserResultRow,
  MetaService,
  MetaTable,
  Viewer,
  ZRaw,
} from '@usevenice/cdk-core'
import {zViewer} from '@usevenice/cdk-core'
import {R, memoize, zFunction} from '@usevenice/util'

import type {TransactionFunction} from 'slonik/dist/src/types'
import {
  applyLimitOffset,
  makePostgresClient,
  zPgConfig,
} from './makePostgresClient'

const getPostgreClient = memoize((databaseUrl: string) =>
  makePostgresClient({databaseUrl}),
)

type Deps = ReturnType<typeof _getDeps>
const _getDeps = (opts: {databaseUrl: string; viewer: Viewer}) => {
  const {viewer, databaseUrl} = opts
  const client = getPostgreClient(databaseUrl)
  return {
    ...client,
    runQueries: async <T>(handler: TransactionFunction<T>) => {
      const pool = await client.getPool()
      const {sql} = client
      return pool.transaction(async (trxn) => {
        if (viewer.role === 'anon') {
          // same as set_config('role', .., true) . But this is probably a bit clear
          // compare to using the select function
          // Though SET LOCAL is does not work with prepared statements
          await trxn.query(sql`SET LOCAL ROLE anon`)
        } else if (viewer.role !== 'system') {
          await trxn.query(sql`SET LOCAL ROLE authenticated`)
          await trxn.query(
            sql`SELECT set_config('viewer.role', ${viewer.role}, true)`,
          )
          await trxn.query(
            sql`SELECT set_config('request.jwt.claim.sub', ${
              viewer.role === 'end_user'
                ? [viewer.workspaceId, viewer.endUserId].join('/')
                : viewer.role === 'user'
                ? viewer.userId
                : viewer.role === 'workspace'
                ? viewer.workspaceId
                : null
            }, true)`,
          )
          if (viewer.role === 'end_user') {
            await trxn.query(
              sql`SELECT set_config('endUser.id', ${viewer.endUserId}, true)`,
            )
            await trxn.query(
              sql`SELECT set_config('endUser.workspaceId', ${viewer.workspaceId}, true)`,
            )
          }
        }
        return handler(trxn)
      })
    },
  }
}

export const makePostgresMetaService = zFunction(
  zPgConfig.pick({databaseUrl: true}).extend({viewer: zViewer}),
  (opts): MetaService => {
    const tables: MetaService['tables'] = {
      // Delay calling of __getDeps until later..
      workspace: metaTable('workspace', _getDeps(opts)),
      workspaceMember: metaTable('workspaceMember', _getDeps(opts)),
      resource: metaTable('resource', _getDeps(opts)),
      institution: metaTable('institution', _getDeps(opts)),
      integration: metaTable('integration', _getDeps(opts)),
      pipeline: metaTable('pipeline', _getDeps(opts)),
    }
    return {
      tables,
      searchEndUsers: ({keywords, ...rest}) => {
        const {runQueries, sql} = _getDeps(opts)
        const where = keywords
          ? sql`WHERE end_user_id ILIKE ${'%' + keywords + '%'}`
          : sql``
        const query = applyLimitOffset(
          sql`
            SELECT
              end_user_id as id,
              count(*) AS resource_count,
              min(created_at) AS first_created_at,
              max(updated_at) AS last_updated_at
            FROM
              resource
            ${where}
            GROUP BY end_user_id
          `,
          rest,
        )
        return runQueries((pool) => pool.any<EndUserResultRow>(query))
      },
      searchInstitutions: ({keywords, providerNames, ...rest}) => {
        const {runQueries, sql} = _getDeps(opts)
        const conditions = R.compact([
          providerNames &&
            sql`provider_name = ANY(${sql.array(providerNames, 'varchar')})`,
          keywords && sql`standard->>'name' ILIKE ${'%' + keywords + '%'}`,
        ])
        const where =
          conditions.length > 0
            ? sql`WHERE ${sql.join(conditions, sql` AND `)}`
            : sql``
        return runQueries((pool) =>
          pool.any(
            applyLimitOffset(sql`SELECT * FROM institution ${where}`, rest),
          ),
        )
      },

      findPipelines: ({resourceIds, secondsSinceLastSync}) => {
        const {runQueries, sql} = _getDeps(opts)
        const ids = resourceIds && sql.array(resourceIds, 'varchar')
        const conditions = R.compact([
          ids && sql`(source_id = ANY(${ids}) OR destination_id = ANY(${ids}))`,
          secondsSinceLastSync &&
            sql`
              (now() - COALESCE(last_sync_completed_at, to_timestamp(0)))
              >= (interval '1 second' * ${secondsSinceLastSync})
            `,
        ])
        const where =
          conditions.length > 0
            ? sql`WHERE ${sql.join(conditions, sql` AND `)}`
            : sql``
        return runQueries((pool) =>
          pool.any(sql`SELECT * FROM pipeline ${where}`),
        )
      },
    }
  },
)

function metaTable<TID extends string, T extends Record<string, unknown>>(
  tableName: keyof ZRaw,
  {sql, upsertById, runQueries}: Deps,
): MetaTable<TID, T> {
  const table = sql.identifier([tableName])

  //  const sqlType = sql.type(zRaw[tableName])

  // TODO: Convert case from snake_case to camelCase
  return {
    list: ({ids, endUserId, keywords, ...rest}) =>
      runQueries((pool) => {
        const conditions = R.compact([
          ids && sql`id = ANY(${sql.array(ids, 'varchar')})`,
          endUserId && sql`end_user_id = ${endUserId}`,
          // Temp solution, shall use fts and make this work for any table...
          keywords &&
            tableName === 'institution' &&
            sql`standard->>'name' ILIKE ${'%' + keywords + '%'}`,
        ])
        const where =
          conditions.length > 0
            ? sql`WHERE ${sql.join(conditions, sql` AND `)}`
            : sql``
        return pool.any(
          applyLimitOffset(sql`SELECT * FROM ${table} ${where}`, rest),
        )
      }),
    get: (id) =>
      runQueries((pool) =>
        pool.maybeOne<T>(sql`SELECT * FROM ${table} where id = ${id}`),
      ),
    set: (id, data) => upsertById(tableName, {...data, id}),
    patch: (id, data) =>
      upsertById(tableName, {...data, id}, {mergeJson: 'shallow'}),
    delete: (id) =>
      runQueries((pool) =>
        pool.query(sql`DELETE FROM ${table} WHERE id = ${id}`),
      ).then(() => {}),
  }
}
