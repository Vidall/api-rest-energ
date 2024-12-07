import type { Knex } from 'knex';
import { ETableName } from '../ETableName';

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable(ETableName.equipamento);
  if (!exists) {
    return knex.schema.createTable(ETableName.equipamento, (table) => {
      table.bigIncrements('id').primary();
      table.enu('tipo', ['fisico', 'juridico']).notNullable();
      table.json('equipamento').notNullable();
      table.bigInteger('idCliente').notNullable();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(ETableName.equipamento);
}
