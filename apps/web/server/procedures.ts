import '@usevenice/app-config/register.node'

import {
  backendEnv,
  makePostgresClient,
} from '@usevenice/app-config/backendConfig'
import type {NonEmptyArray} from '@usevenice/util'
import {makeUlid} from '@usevenice/util'

import type {Id} from '@usevenice/cdk-core'
import {makeId} from '@usevenice/cdk-core'

export async function dropDbUser(userId: string) {
  const pgClient = makePostgresClient({
    databaseUrl: backendEnv.POSTGRES_OR_WEBHOOK_URL,
    transformFieldNames: false,
  })
  const sql = pgClient.sql
  const pool = await pgClient.getPool()
  const usr = sql.identifier([`usr_${userId}`])

  await pool.transaction(async (trxn) => {
    await trxn.query(
      sql`REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM ${usr}`,
    )
    await trxn.query(sql`REVOKE USAGE ON SCHEMA public FROM ${usr}`)
    await trxn.query(sql`DROP USER ${usr}`)
    await trxn.query(
      sql`UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data - 'apiKey' WHERE id = ${userId}`,
    )
  })
}

export async function ensureDatabaseUser(userId: string) {
  const pgClient = makePostgresClient({
    databaseUrl: backendEnv.POSTGRES_OR_WEBHOOK_URL,
    transformFieldNames: false,
  })
  const sql = pgClient.sql
  const pool = await pgClient.getPool()

  const username = `usr_${userId}`
  let apiKey = await pool.maybeOneFirst<string>(sql`
    SELECT
      raw_user_meta_data ->> 'apiKey'
    FROM
      auth.users
    WHERE
      id = ${userId}
      AND starts_with (raw_user_meta_data ->> 'apiKey', 'key_')
  `)

  const adminUrl = new URL(backendEnv.POSTGRES_OR_WEBHOOK_URL)
  const getUrl = () =>
    `${adminUrl.protocol}//${username}:${apiKey}@${adminUrl.hostname}:${adminUrl.port}${adminUrl.pathname}`
  if (apiKey) {
    return {usr: username, apiKey, databaseUrl: getUrl()}
  }

  const usr = sql.identifier([username])
  await pool.transaction(async (trxn) => {
    apiKey = `key_${makeUlid()}`
    await trxn.query(
      sql`CREATE USER ${usr} PASSWORD ${sql.literalValue(apiKey)}`,
    )
    await trxn.query(
      sql`GRANT ${usr} TO ${sql.identifier([adminUrl.username])}`,
    )
    await trxn.query(sql`GRANT USAGE ON SCHEMA public TO ${usr}`)
    await trxn.query(
      sql`GRANT SELECT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ${usr}`,
    )
    await trxn.query(
      sql`REVOKE ALL PRIVILEGES ON public.migrations FROM ${usr}`,
    )
    await trxn.query(
      sql`REVOKE ALL PRIVILEGES ON public.integration FROM ${usr}`,
    )
    await trxn.query(
      sql`UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || ${sql.jsonb(
        {apiKey},
      )} WHERE id = ${userId}`,
    )
  })

  return {usr, apiKey, databaseUrl: getUrl()}
}

export async function ensureDefaultLedger(userId: string) {
  const pgClient = makePostgresClient({
    databaseUrl: backendEnv.POSTGRES_OR_WEBHOOK_URL,
    transformFieldNames: false,
  })
  const sql = pgClient.sql
  const pool = await pgClient.getPool()
  const ids = await pool.anyFirst<Id['reso']>(
    sql`SELECT id FROM resource WHERE creator_id = ${userId} AND provider_name = 'postgres'`,
  )
  console.log('[ensureDefaultLedger] ids', ids)
  if (ids.length > 0) {
    return ids as NonEmptyArray<Id['reso']>
  }
  const ledgerId = makeId('reso', 'postgres', userId)
  await pool.query(
    sql`INSERT INTO resource (id, creator_id) VALUES (${ledgerId}, ${userId})`,
  )
  return [ledgerId] as NonEmptyArray<Id['reso']>
}

export async function getDatabaseInfo(userId: string) {
  const info = await ensureDatabaseUser(userId)
  const {getPool, sql} = makePostgresClient({
    databaseUrl: info.databaseUrl,
    transformFieldNames: false,
  })
  const pool = await getPool()
  const tables = await pool.any<{table_name: string; table_type: string}>(
    sql`
      SELECT
        "table_name",
        table_type
      FROM
        information_schema.tables
      WHERE
        table_schema = 'public'
      ORDER BY
        table_type DESC,
        "table_name"
    `,
  )
  return {...info, tables}
}

// TODO: Sync roles with users, and reset to latest permissions, ensure this is sync'ed with ensureDatabaseUser
export async function autoRepairRoles() {
  const {getPool, sql} = makePostgresClient({
    databaseUrl: backendEnv.POSTGRES_OR_WEBHOOK_URL,
    transformFieldNames: false,
  })
  const pool = await getPool()
  await pool.query(
    sql`
      DO $$
        DECLARE
          ele record;
        BEGIN
          FOR ele IN
          SELECT
            usename
          FROM
            pg_user
          WHERE
            starts_with (usename, 'usr_')
            LOOP
              EXECUTE format('
      GRANT %I to postgres;
      GRANT SELECT, UPDATE, DELETE ON public.transaction, public.posting TO %I;
        ', ele.usename, ele.usename);
            END LOOP;
        END;
        $$;
    `,
  )
}
