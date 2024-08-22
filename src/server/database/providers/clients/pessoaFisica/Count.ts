import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';

export const count = async (filter=''): Promise<number | Error> => {
  try {
    const [{ count }] = await knex(ETableName.pessoaFisica)
      .where('cpf', 'like', `%${filter}%`)
      .orWhere('nome', 'like', `%${filter}%`)
      .count<[{count: number}]>('* as count');

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error('Erro ao consultar a quantidade total de registros');

  } catch (error) {
    console.error(error);

    return new Error('Não foi possivel realizar a contagem');
  }
};