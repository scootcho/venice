/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/": {
    /** OpenAPI description (this document) */
    get: {
      /** OpenAPI description (this document) */
      responses: {
        /** @description OK */
        200: never;
      };
    };
  };
  "/account": {
    /**
     * @graphql({ 
     * @description 	"primary_key_columns": ["id"],
     * 	"totalCount": {"enabled": true},
     * 	"foreign_keys": []
     * })
     */
    get: {
      /**
       * @graphql({ 
       * @description 	"primary_key_columns": ["id"],
       * 	"totalCount": {"enabled": true},
       * 	"foreign_keys": []
       * })
       */
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["account"])[];
            "application/vnd.pgrst.object+json": (components["schemas"]["account"])[];
            "text/csv": (components["schemas"]["account"])[];
          };
        };
        /** @description Partial Content */
        206: never;
      };
    };
    /**
     * @graphql({ 
     * @description 	"primary_key_columns": ["id"],
     * 	"totalCount": {"enabled": true},
     * 	"foreign_keys": []
     * })
     */
    post: {
      /**
       * @graphql({ 
       * @description 	"primary_key_columns": ["id"],
       * 	"totalCount": {"enabled": true},
       * 	"foreign_keys": []
       * })
       */
      requestBody: components["requestBodies"]["account"];
      responses: {
        /** @description Created */
        201: never;
      };
    };
    /**
     * @graphql({ 
     * @description 	"primary_key_columns": ["id"],
     * 	"totalCount": {"enabled": true},
     * 	"foreign_keys": []
     * })
     */
    delete: {
      /**
       * @graphql({ 
       * @description 	"primary_key_columns": ["id"],
       * 	"totalCount": {"enabled": true},
       * 	"foreign_keys": []
       * })
       */
      responses: {
        /** @description No Content */
        204: never;
      };
    };
    /**
     * @graphql({ 
     * @description 	"primary_key_columns": ["id"],
     * 	"totalCount": {"enabled": true},
     * 	"foreign_keys": []
     * })
     */
    patch: {
      /**
       * @graphql({ 
       * @description 	"primary_key_columns": ["id"],
       * 	"totalCount": {"enabled": true},
       * 	"foreign_keys": []
       * })
       */
      requestBody: components["requestBodies"]["account"];
      responses: {
        /** @description No Content */
        204: never;
      };
    };
  };
  "/institution": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["institution"])[];
            "application/vnd.pgrst.object+json": (components["schemas"]["institution"])[];
            "text/csv": (components["schemas"]["institution"])[];
          };
        };
        /** @description Partial Content */
        206: never;
      };
    };
    post: {
      requestBody: components["requestBodies"]["institution"];
      responses: {
        /** @description Created */
        201: never;
      };
    };
    delete: {
      responses: {
        /** @description No Content */
        204: never;
      };
    };
    patch: {
      requestBody: components["requestBodies"]["institution"];
      responses: {
        /** @description No Content */
        204: never;
      };
    };
  };
  "/integration": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["integration"])[];
            "application/vnd.pgrst.object+json": (components["schemas"]["integration"])[];
            "text/csv": (components["schemas"]["integration"])[];
          };
        };
        /** @description Partial Content */
        206: never;
      };
    };
    post: {
      requestBody: components["requestBodies"]["integration"];
      responses: {
        /** @description Created */
        201: never;
      };
    };
    delete: {
      responses: {
        /** @description No Content */
        204: never;
      };
    };
    patch: {
      requestBody: components["requestBodies"]["integration"];
      responses: {
        /** @description No Content */
        204: never;
      };
    };
  };
  "/pipeline": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["pipeline"])[];
            "application/vnd.pgrst.object+json": (components["schemas"]["pipeline"])[];
            "text/csv": (components["schemas"]["pipeline"])[];
          };
        };
        /** @description Partial Content */
        206: never;
      };
    };
    post: {
      requestBody: components["requestBodies"]["pipeline"];
      responses: {
        /** @description Created */
        201: never;
      };
    };
    delete: {
      responses: {
        /** @description No Content */
        204: never;
      };
    };
    patch: {
      requestBody: components["requestBodies"]["pipeline"];
      responses: {
        /** @description No Content */
        204: never;
      };
    };
  };
  "/raw_account": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["raw_account"])[];
            "application/vnd.pgrst.object+json": (components["schemas"]["raw_account"])[];
            "text/csv": (components["schemas"]["raw_account"])[];
          };
        };
        /** @description Partial Content */
        206: never;
      };
    };
    post: {
      requestBody: components["requestBodies"]["raw_account"];
      responses: {
        /** @description Created */
        201: never;
      };
    };
    delete: {
      responses: {
        /** @description No Content */
        204: never;
      };
    };
    patch: {
      requestBody: components["requestBodies"]["raw_account"];
      responses: {
        /** @description No Content */
        204: never;
      };
    };
  };
  "/raw_commodity": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["raw_commodity"])[];
            "application/vnd.pgrst.object+json": (components["schemas"]["raw_commodity"])[];
            "text/csv": (components["schemas"]["raw_commodity"])[];
          };
        };
        /** @description Partial Content */
        206: never;
      };
    };
    post: {
      requestBody: components["requestBodies"]["raw_commodity"];
      responses: {
        /** @description Created */
        201: never;
      };
    };
    delete: {
      responses: {
        /** @description No Content */
        204: never;
      };
    };
    patch: {
      requestBody: components["requestBodies"]["raw_commodity"];
      responses: {
        /** @description No Content */
        204: never;
      };
    };
  };
  "/raw_transaction": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["raw_transaction"])[];
            "application/vnd.pgrst.object+json": (components["schemas"]["raw_transaction"])[];
            "text/csv": (components["schemas"]["raw_transaction"])[];
          };
        };
        /** @description Partial Content */
        206: never;
      };
    };
    post: {
      requestBody: components["requestBodies"]["raw_transaction"];
      responses: {
        /** @description Created */
        201: never;
      };
    };
    delete: {
      responses: {
        /** @description No Content */
        204: never;
      };
    };
    patch: {
      requestBody: components["requestBodies"]["raw_transaction"];
      responses: {
        /** @description No Content */
        204: never;
      };
    };
  };
  "/resource": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["resource"])[];
            "application/vnd.pgrst.object+json": (components["schemas"]["resource"])[];
            "text/csv": (components["schemas"]["resource"])[];
          };
        };
        /** @description Partial Content */
        206: never;
      };
    };
    post: {
      requestBody: components["requestBodies"]["resource"];
      responses: {
        /** @description Created */
        201: never;
      };
    };
    delete: {
      responses: {
        /** @description No Content */
        204: never;
      };
    };
    patch: {
      requestBody: components["requestBodies"]["resource"];
      responses: {
        /** @description No Content */
        204: never;
      };
    };
  };
  "/transaction": {
    /**
     * TODO: Add description of transaction data type here... 
     * @description @graphql({
     * 	"primary_key_columns": ["id"],
     * 	"totalCount": {"enabled": true},
     * 	"description": "Double entry transaction",
     * 	"foreign_keys": [
     * 		{
     *       "local_name": "transactions",
     *       "local_columns": ["account_id"],
     *       "foreign_name": "account",
     *       "foreign_schema": "public",
     *       "foreign_table": "account",
     *       "foreign_columns": ["id"]
     * 		}
     * 	]
     * })
     */
    get: {
      /**
       * TODO: Add description of transaction data type here... 
       * @description @graphql({
       * 	"primary_key_columns": ["id"],
       * 	"totalCount": {"enabled": true},
       * 	"description": "Double entry transaction",
       * 	"foreign_keys": [
       * 		{
       *       "local_name": "transactions",
       *       "local_columns": ["account_id"],
       *       "foreign_name": "account",
       *       "foreign_schema": "public",
       *       "foreign_table": "account",
       *       "foreign_columns": ["id"]
       * 		}
       * 	]
       * })
       */
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["transaction"])[];
            "application/vnd.pgrst.object+json": (components["schemas"]["transaction"])[];
            "text/csv": (components["schemas"]["transaction"])[];
          };
        };
        /** @description Partial Content */
        206: never;
      };
    };
    /**
     * TODO: Add description of transaction data type here... 
     * @description @graphql({
     * 	"primary_key_columns": ["id"],
     * 	"totalCount": {"enabled": true},
     * 	"description": "Double entry transaction",
     * 	"foreign_keys": [
     * 		{
     *       "local_name": "transactions",
     *       "local_columns": ["account_id"],
     *       "foreign_name": "account",
     *       "foreign_schema": "public",
     *       "foreign_table": "account",
     *       "foreign_columns": ["id"]
     * 		}
     * 	]
     * })
     */
    post: {
      /**
       * TODO: Add description of transaction data type here... 
       * @description @graphql({
       * 	"primary_key_columns": ["id"],
       * 	"totalCount": {"enabled": true},
       * 	"description": "Double entry transaction",
       * 	"foreign_keys": [
       * 		{
       *       "local_name": "transactions",
       *       "local_columns": ["account_id"],
       *       "foreign_name": "account",
       *       "foreign_schema": "public",
       *       "foreign_table": "account",
       *       "foreign_columns": ["id"]
       * 		}
       * 	]
       * })
       */
      requestBody: components["requestBodies"]["transaction"];
      responses: {
        /** @description Created */
        201: never;
      };
    };
    /**
     * TODO: Add description of transaction data type here... 
     * @description @graphql({
     * 	"primary_key_columns": ["id"],
     * 	"totalCount": {"enabled": true},
     * 	"description": "Double entry transaction",
     * 	"foreign_keys": [
     * 		{
     *       "local_name": "transactions",
     *       "local_columns": ["account_id"],
     *       "foreign_name": "account",
     *       "foreign_schema": "public",
     *       "foreign_table": "account",
     *       "foreign_columns": ["id"]
     * 		}
     * 	]
     * })
     */
    delete: {
      /**
       * TODO: Add description of transaction data type here... 
       * @description @graphql({
       * 	"primary_key_columns": ["id"],
       * 	"totalCount": {"enabled": true},
       * 	"description": "Double entry transaction",
       * 	"foreign_keys": [
       * 		{
       *       "local_name": "transactions",
       *       "local_columns": ["account_id"],
       *       "foreign_name": "account",
       *       "foreign_schema": "public",
       *       "foreign_table": "account",
       *       "foreign_columns": ["id"]
       * 		}
       * 	]
       * })
       */
      responses: {
        /** @description No Content */
        204: never;
      };
    };
    /**
     * TODO: Add description of transaction data type here... 
     * @description @graphql({
     * 	"primary_key_columns": ["id"],
     * 	"totalCount": {"enabled": true},
     * 	"description": "Double entry transaction",
     * 	"foreign_keys": [
     * 		{
     *       "local_name": "transactions",
     *       "local_columns": ["account_id"],
     *       "foreign_name": "account",
     *       "foreign_schema": "public",
     *       "foreign_table": "account",
     *       "foreign_columns": ["id"]
     * 		}
     * 	]
     * })
     */
    patch: {
      /**
       * TODO: Add description of transaction data type here... 
       * @description @graphql({
       * 	"primary_key_columns": ["id"],
       * 	"totalCount": {"enabled": true},
       * 	"description": "Double entry transaction",
       * 	"foreign_keys": [
       * 		{
       *       "local_name": "transactions",
       *       "local_columns": ["account_id"],
       *       "foreign_name": "account",
       *       "foreign_schema": "public",
       *       "foreign_table": "account",
       *       "foreign_columns": ["id"]
       * 		}
       * 	]
       * })
       */
      requestBody: components["requestBodies"]["transaction"];
      responses: {
        /** @description No Content */
        204: never;
      };
    };
  };
  "/transaction_split": {
    /**
     * Entities summary 
     * @description   Entities description that
     *   spans
     *   multiple lines
     *   
     *   
     * 	@graphql({
     * 		"primary_key_columns": ["id", "key"],
     * 		"totalCount": {"enabled": true},
     * 		"foreign_keys": []
     * 	})
     */
    get: {
      /**
       * Entities summary 
       * @description   Entities description that
       *   spans
       *   multiple lines
       *   
       *   
       * 	@graphql({
       * 		"primary_key_columns": ["id", "key"],
       * 		"totalCount": {"enabled": true},
       * 		"foreign_keys": []
       * 	})
       */
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["transaction_split"])[];
            "application/vnd.pgrst.object+json": (components["schemas"]["transaction_split"])[];
            "text/csv": (components["schemas"]["transaction_split"])[];
          };
        };
        /** @description Partial Content */
        206: never;
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /**
     * @description @graphql({
     * 	"primary_key_columns": ["id"],
     * 	"totalCount": {"enabled": true},
     * 	"foreign_keys": []
     * })
     */
    account: {
      /**
       * Format: character varying 
       * @description Note:
       * This is a Primary Key.<pk/>
       */
      id?: string;
      /** Format: text */
      name?: string;
      /** Format: text */
      type?: string;
      /** Format: text */
      last_four?: string;
      /** Format: text */
      institution_name?: string;
      /** Format: text */
      default_unit?: string;
      /** Format: double precision */
      current_balance?: number;
      /** Format: double precision */
      available_balance?: number;
      /** Format: jsonb */
      external?: Record<string, never>;
      /** Format: timestamp with time zone */
      updated_at?: string;
      /** Format: timestamp with time zone */
      created_at?: string;
    };
    institution: {
      /**
       * Format: character varying 
       * @description Note:
       * This is a Primary Key.<pk/> 
       * @default public.generate_ulid()
       */
      id: string;
      /** Format: jsonb */
      standard: Record<string, never>;
      /** Format: jsonb */
      external: Record<string, never>;
      /**
       * Format: timestamp with time zone 
       * @default now()
       */
      created_at: string;
      /**
       * Format: timestamp with time zone 
       * @default now()
       */
      updated_at: string;
      /**
       * Format: character varying 
       * @default split_part((id)::text, '_'::text, 2)
       */
      provider_name: string;
    };
    integration: {
      /**
       * Format: character varying 
       * @description Note:
       * This is a Primary Key.<pk/> 
       * @default public.generate_ulid()
       */
      id: string;
      /** Format: jsonb */
      config: Record<string, never>;
      /**
       * Format: timestamp with time zone 
       * @default now()
       */
      created_at: string;
      /**
       * Format: timestamp with time zone 
       * @default now()
       */
      updated_at: string;
      /**
       * Format: character varying 
       * @default split_part((id)::text, '_'::text, 2)
       */
      provider_name: string;
    };
    pipeline: {
      /**
       * Format: character varying 
       * @description Note:
       * This is a Primary Key.<pk/> 
       * @default public.generate_ulid()
       */
      id: string;
      /**
       * Format: character varying 
       * @description Note:
       * This is a Foreign Key to `resource.id`.<fk table='resource' column='id'/>
       */
      source_id?: string;
      /** Format: jsonb */
      source_state: Record<string, never>;
      /**
       * Format: character varying 
       * @description Note:
       * This is a Foreign Key to `resource.id`.<fk table='resource' column='id'/>
       */
      destination_id?: string;
      /** Format: jsonb */
      destination_state: Record<string, never>;
      /** Format: jsonb */
      link_options: Record<string, never>;
      /**
       * Format: timestamp with time zone 
       * @default now()
       */
      created_at: string;
      /**
       * Format: timestamp with time zone 
       * @default now()
       */
      updated_at: string;
      /** Format: timestamp with time zone */
      last_sync_started_at?: string;
      /** Format: timestamp with time zone */
      last_sync_completed_at?: string;
    };
    raw_account: {
      /**
       * Format: character varying 
       * @description Note:
       * This is a Primary Key.<pk/> 
       * @default public.generate_ulid()
       */
      id: string;
      /** Format: character varying */
      source_id?: string;
      /** Format: jsonb */
      standard: Record<string, never>;
      /** Format: jsonb */
      external: Record<string, never>;
      /**
       * Format: timestamp with time zone 
       * @default now()
       */
      created_at: string;
      /**
       * Format: timestamp with time zone 
       * @default now()
       */
      updated_at: string;
      /**
       * Format: character varying 
       * @default split_part((id)::text, '_'::text, 2)
       */
      provider_name: string;
      /**
       * Format: character varying 
       * @description Note:
       * This is a Foreign Key to `resource.id`.<fk table='resource' column='id'/>
       */
      ledger_resource_id?: string;
    };
    raw_commodity: {
      /**
       * Format: character varying 
       * @description Note:
       * This is a Primary Key.<pk/> 
       * @default public.generate_ulid()
       */
      id: string;
      /** Format: character varying */
      source_id?: string;
      /** Format: jsonb */
      standard: Record<string, never>;
      /** Format: jsonb */
      external: Record<string, never>;
      /**
       * Format: timestamp with time zone 
       * @default now()
       */
      created_at: string;
      /**
       * Format: timestamp with time zone 
       * @default now()
       */
      updated_at: string;
      /**
       * Format: character varying 
       * @default split_part((id)::text, '_'::text, 2)
       */
      provider_name: string;
      /**
       * Format: character varying 
       * @description Note:
       * This is a Foreign Key to `resource.id`.<fk table='resource' column='id'/>
       */
      ledger_resource_id?: string;
    };
    raw_transaction: {
      /**
       * Format: character varying 
       * @description Note:
       * This is a Primary Key.<pk/> 
       * @default public.generate_ulid()
       */
      id: string;
      /** Format: character varying */
      source_id?: string;
      /** Format: jsonb */
      standard: Record<string, never>;
      /** Format: jsonb */
      external: Record<string, never>;
      /**
       * Format: timestamp with time zone 
       * @default now()
       */
      created_at: string;
      /**
       * Format: timestamp with time zone 
       * @default now()
       */
      updated_at: string;
      /**
       * Format: character varying 
       * @default split_part((id)::text, '_'::text, 2)
       */
      provider_name: string;
      /**
       * Format: character varying 
       * @description Note:
       * This is a Foreign Key to `resource.id`.<fk table='resource' column='id'/>
       */
      ledger_resource_id?: string;
    };
    resource: {
      /**
       * Format: character varying 
       * @description Note:
       * This is a Primary Key.<pk/> 
       * @default public.generate_ulid()
       */
      id: string;
      /** Format: character varying */
      creator_id?: string;
      /**
       * Format: character varying 
       * @description Note:
       * This is a Foreign Key to `integration.id`.<fk table='integration' column='id'/>
       */
      integration_id?: string;
      /**
       * Format: character varying 
       * @description Note:
       * This is a Foreign Key to `institution.id`.<fk table='institution' column='id'/>
       */
      institution_id?: string;
      /** Format: character varying */
      env_name?: string;
      /** Format: jsonb */
      settings: Record<string, never>;
      /**
       * Format: timestamp with time zone 
       * @default now()
       */
      created_at: string;
      /**
       * Format: timestamp with time zone 
       * @default now()
       */
      updated_at: string;
      /**
       * Format: character varying 
       * @default split_part((id)::text, '_'::text, 2)
       */
      provider_name: string;
      /** Format: character varying */
      display_name?: string;
    };
    /**
     * @description TODO: Add description of transaction data type here...
     * 
     * @graphql({
     * 	"primary_key_columns": ["id"],
     * 	"totalCount": {"enabled": true},
     * 	"description": "Double entry transaction",
     * 	"foreign_keys": [
     * 		{
     *       "local_name": "transactions",
     *       "local_columns": ["account_id"],
     *       "foreign_name": "account",
     *       "foreign_schema": "public",
     *       "foreign_table": "account",
     *       "foreign_columns": ["id"]
     * 		}
     * 	]
     * })
     */
    transaction: {
      /**
       * Format: character varying 
       * @description Note:
       * This is a Primary Key.<pk/>
       */
      id?: string;
      /** Format: text */
      date?: string;
      /** Format: text */
      description?: string;
      /** Format: text */
      payee?: string;
      /** Format: double precision */
      amount_quantity?: number;
      /** Format: text */
      amount_unit?: string;
      /** Format: text */
      account_id?: string;
      /** Format: text */
      external_category?: string;
      /** Format: text */
      notes?: string;
      /** Format: jsonb */
      splits?: Record<string, never>;
      /** Format: jsonb */
      external?: Record<string, never>;
      /** Format: timestamp with time zone */
      updated_at?: string;
      /** Format: timestamp with time zone */
      created_at?: string;
    };
    /**
     * @description Entities summary
     * 
     *   Entities description that
     *   spans
     *   multiple lines
     *   
     *   
     * 	@graphql({
     * 		"primary_key_columns": ["id", "key"],
     * 		"totalCount": {"enabled": true},
     * 		"foreign_keys": []
     * 	})
     */
    transaction_split: {
      /**
       * Format: character varying 
       * @description Note:
       * This is a Primary Key.<pk/>
       */
      transaction_id?: string;
      /** Format: text */
      key?: string;
      /** Format: text */
      amount_quantity?: string;
      /** Format: text */
      amount_unit?: string;
      /** Format: text */
      account_id?: string;
      /** Format: jsonb */
      data?: Record<string, never>;
      /** Format: timestamp with time zone */
      updated_at?: string;
      /** Format: timestamp with time zone */
      created_at?: string;
    };
  };
  responses: never;
  parameters: {
    /** @description Preference */
    preferParams: "params=single-object";
    /** @description Preference */
    preferReturn: "return=representation" | "return=minimal" | "return=none";
    /** @description Preference */
    preferCount: "count=none";
    /** @description Preference */
    preferPost: "return=representation" | "return=minimal" | "return=none" | "resolution=ignore-duplicates" | "resolution=merge-duplicates";
    /** @description Filtering Columns */
    select: string;
    /** @description On Conflict */
    on_conflict: string;
    /** @description Ordering */
    order: string;
    /** @description Limiting and Pagination */
    range: string;
    /** @description Limiting and Pagination */
    rangeUnit: string;
    /** @description Limiting and Pagination */
    offset: string;
    /** @description Limiting and Pagination */
    limit: string;
    "rowFilter.raw_transaction.id": string;
    "rowFilter.raw_transaction.source_id": string;
    "rowFilter.raw_transaction.standard": string;
    "rowFilter.raw_transaction.external": string;
    "rowFilter.raw_transaction.created_at": string;
    "rowFilter.raw_transaction.updated_at": string;
    "rowFilter.raw_transaction.provider_name": string;
    "rowFilter.raw_transaction.ledger_resource_id": string;
    "rowFilter.account.id": string;
    "rowFilter.account.name": string;
    "rowFilter.account.type": string;
    "rowFilter.account.last_four": string;
    "rowFilter.account.institution_name": string;
    "rowFilter.account.default_unit": string;
    "rowFilter.account.current_balance": string;
    "rowFilter.account.available_balance": string;
    "rowFilter.account.external": string;
    "rowFilter.account.updated_at": string;
    "rowFilter.account.created_at": string;
    "rowFilter.transaction.id": string;
    "rowFilter.transaction.date": string;
    "rowFilter.transaction.description": string;
    "rowFilter.transaction.payee": string;
    "rowFilter.transaction.amount_quantity": string;
    "rowFilter.transaction.amount_unit": string;
    "rowFilter.transaction.account_id": string;
    "rowFilter.transaction.external_category": string;
    "rowFilter.transaction.notes": string;
    "rowFilter.transaction.splits": string;
    "rowFilter.transaction.external": string;
    "rowFilter.transaction.updated_at": string;
    "rowFilter.transaction.created_at": string;
    "rowFilter.raw_commodity.id": string;
    "rowFilter.raw_commodity.source_id": string;
    "rowFilter.raw_commodity.standard": string;
    "rowFilter.raw_commodity.external": string;
    "rowFilter.raw_commodity.created_at": string;
    "rowFilter.raw_commodity.updated_at": string;
    "rowFilter.raw_commodity.provider_name": string;
    "rowFilter.raw_commodity.ledger_resource_id": string;
    "rowFilter.resource.id": string;
    "rowFilter.resource.creator_id": string;
    "rowFilter.resource.integration_id": string;
    "rowFilter.resource.institution_id": string;
    "rowFilter.resource.env_name": string;
    "rowFilter.resource.settings": string;
    "rowFilter.resource.created_at": string;
    "rowFilter.resource.updated_at": string;
    "rowFilter.resource.provider_name": string;
    "rowFilter.resource.display_name": string;
    "rowFilter.pipeline.id": string;
    "rowFilter.pipeline.source_id": string;
    "rowFilter.pipeline.source_state": string;
    "rowFilter.pipeline.destination_id": string;
    "rowFilter.pipeline.destination_state": string;
    "rowFilter.pipeline.link_options": string;
    "rowFilter.pipeline.created_at": string;
    "rowFilter.pipeline.updated_at": string;
    "rowFilter.pipeline.last_sync_started_at": string;
    "rowFilter.pipeline.last_sync_completed_at": string;
    "rowFilter.integration.id": string;
    "rowFilter.integration.config": string;
    "rowFilter.integration.created_at": string;
    "rowFilter.integration.updated_at": string;
    "rowFilter.integration.provider_name": string;
    "rowFilter.transaction_split.transaction_id": string;
    "rowFilter.transaction_split.key": string;
    "rowFilter.transaction_split.amount_quantity": string;
    "rowFilter.transaction_split.amount_unit": string;
    "rowFilter.transaction_split.account_id": string;
    "rowFilter.transaction_split.data": string;
    "rowFilter.transaction_split.updated_at": string;
    "rowFilter.transaction_split.created_at": string;
    "rowFilter.raw_account.id": string;
    "rowFilter.raw_account.source_id": string;
    "rowFilter.raw_account.standard": string;
    "rowFilter.raw_account.external": string;
    "rowFilter.raw_account.created_at": string;
    "rowFilter.raw_account.updated_at": string;
    "rowFilter.raw_account.provider_name": string;
    "rowFilter.raw_account.ledger_resource_id": string;
    "rowFilter.institution.id": string;
    "rowFilter.institution.standard": string;
    "rowFilter.institution.external": string;
    "rowFilter.institution.created_at": string;
    "rowFilter.institution.updated_at": string;
    "rowFilter.institution.provider_name": string;
  };
  requestBodies: {
    /** @description institution */
    institution?: {
      content: {
        "application/json": components["schemas"]["institution"];
        "application/vnd.pgrst.object+json": components["schemas"]["institution"];
        "text/csv": components["schemas"]["institution"];
      };
    };
    /** @description raw_commodity */
    raw_commodity?: {
      content: {
        "application/json": components["schemas"]["raw_commodity"];
        "application/vnd.pgrst.object+json": components["schemas"]["raw_commodity"];
        "text/csv": components["schemas"]["raw_commodity"];
      };
    };
    /** @description account */
    account?: {
      content: {
        "application/json": components["schemas"]["account"];
        "application/vnd.pgrst.object+json": components["schemas"]["account"];
        "text/csv": components["schemas"]["account"];
      };
    };
    /** @description raw_account */
    raw_account?: {
      content: {
        "application/json": components["schemas"]["raw_account"];
        "application/vnd.pgrst.object+json": components["schemas"]["raw_account"];
        "text/csv": components["schemas"]["raw_account"];
      };
    };
    /** @description pipeline */
    pipeline?: {
      content: {
        "application/json": components["schemas"]["pipeline"];
        "application/vnd.pgrst.object+json": components["schemas"]["pipeline"];
        "text/csv": components["schemas"]["pipeline"];
      };
    };
    /** @description integration */
    integration?: {
      content: {
        "application/json": components["schemas"]["integration"];
        "application/vnd.pgrst.object+json": components["schemas"]["integration"];
        "text/csv": components["schemas"]["integration"];
      };
    };
    /** @description raw_transaction */
    raw_transaction?: {
      content: {
        "application/json": components["schemas"]["raw_transaction"];
        "application/vnd.pgrst.object+json": components["schemas"]["raw_transaction"];
        "text/csv": components["schemas"]["raw_transaction"];
      };
    };
    /** @description resource */
    resource?: {
      content: {
        "application/json": components["schemas"]["resource"];
        "application/vnd.pgrst.object+json": components["schemas"]["resource"];
        "text/csv": components["schemas"]["resource"];
      };
    };
    /** @description transaction */
    transaction?: {
      content: {
        "application/json": components["schemas"]["transaction"];
        "application/vnd.pgrst.object+json": components["schemas"]["transaction"];
        "text/csv": components["schemas"]["transaction"];
      };
    };
  };
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export type operations = Record<string, never>;
