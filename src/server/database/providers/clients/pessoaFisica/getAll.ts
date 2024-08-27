import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { Endereco, IPessoaFisica } from '../../../models';

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IPessoaFisica[] | Error> => {
  try {
    const result = await knex(ETableName.pessoaFisica)
      .select('*')
      .where('id', id)
      .orWhere('nome', 'like', `%${filter}%`)
      .orWhere('cpf', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    // Verificação para ver se possui o id junto nas query
    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await knex(ETableName.pessoaFisica)
        .select('*')
        .where('id', id)
        .first();

      if (resultById) {
        return [
          ...result,
          {
            ...resultById,
            endereco: resultById.endereco as Endereco,
          },
        ] as IPessoaFisica[];
      }
    }

    // Se o campo endereco é JSON nativo, não é necessário JSON.parse
    const finalResult = result.map(item => ({
      ...item,
      endereco: item.endereco as Endereco,
    })) as IPessoaFisica[];

    return finalResult;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar clientes');
  }
};
