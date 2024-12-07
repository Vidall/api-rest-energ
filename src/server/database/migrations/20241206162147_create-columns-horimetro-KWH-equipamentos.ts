import type { Knex } from 'knex';
import { ETableName } from '../ETableName';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(ETableName.equipamento, (table) => {
    table.decimal('horimetro_atual').defaultTo(0.00);
    table.decimal('KWH_atual').defaultTo(0.00);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(ETableName.equipamento, (table) => {
    table.dropColumn('horimetro_atual');
    table.dropColumn('KWH_atual');
  });
}