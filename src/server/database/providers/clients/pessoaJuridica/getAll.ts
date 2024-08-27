import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { Endereco, IpessoaJuridica } from '../../../models';

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IpessoaJuridica[] | Error> => {
  try {
    const result = await knex(ETableName.pessoaJuridica)
      .select('*')
      .where('id', id)
      .orWhere('nome', 'like', `%${filter}%`)
      .orWhere('cnpj', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    // Verifica se o id está na lista de resultados, se não estiver, faz uma nova consulta
    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await knex(ETableName.pessoaJuridica)
        .select('*')
        .where('id', id)
        .first();

      if (resultById) {
        return [
          ...result,
          {
            ...resultById,
            endereco: resultById.endereco as Endereco, // Sem necessidade de JSON.parse
          },
        ] as IpessoaJuridica[];
      }
    }

    // Se o campo endereco é JSON nativo, não é necessário JSON.parse
    const finalResult = result.map(item => ({
      ...item,
      endereco: item.endereco as Endereco, // Sem necessidade de JSON.parse
    })) as IpessoaJuridica[];

    return finalResult;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar clientes');
  }
};
