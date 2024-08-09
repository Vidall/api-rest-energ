import type { Knex } from 'knex';
import { ETableName } from '../ETableName';

export async function up(knex: Knex): Promise<void> {
  return knex 
    .schema
    .createTable(ETableName.pessoaJuridica, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome').checkLength('>=', 3).checkLength('<=', 150).notNullable();
      table.string('cnpj').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('telefone').notNullable();
      table.json('endereco').notNullable();
      table.string('tipo').notNullable().defaultTo('juridico');
      table.string('nomeContato');
      table.string('tipoContrato');
      table.boolean('possuiContrato');

      table.comment('Criado a tabela cliente pessoa juridica');
    });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableName.pessoaJuridica);
}

