import type { Knex } from 'knex';
import { ETableName } from '../ETableName';

export async function up(knex: Knex): Promise<void> {
  return knex
    .schema
    .createTable(ETableName.tecnico, table => {
      table.bigIncrements('id').primary().index(),
      table.string('nome').checkLength('>=', 3).checkLength('<=', 150).notNullable();
      table.string('cpf').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('telefone').notNullable();
      table.string('senha').checkLength('<=', 150).notNullable();
      table.boolean('admin').notNullable();
      table.string('pathAssinatura');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex
    .schema
    .dropTable(ETableName.tecnico);
}

