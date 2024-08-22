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
      .offset((page - 1 ) * limit)
      .limit(limit);

    /*Verificação para ver se possui o id junto nas query,
    se tiver o id retorna a pessoa fisica junto com as demais*/
    if (id > 0 && result.every(item => item.id !== id) ) {
      const resultById = await knex(ETableName.pessoaFisica)
        .select('*')
        .where('id', id)
        .first();

      /*Realizar o parse dos escolhidos no limit e no id*/
      if (resultById) {
        return [
          ...result.map(item => ({
            ...item,
            endereco: JSON.parse(item.endereco as unknown as string) as Endereco,
          })),
          {
            ...resultById,
            endereco: JSON.parse(resultById.endereco as unknown as string) as Endereco,
          },
        ] as IPessoaFisica[];
      }
    }

    // converter os endereco para JSON Stringfy
    const finalResult = result.map(item => ({
      ...item,
      endereco: JSON.parse(item.endereco as unknown as string),
    })) as IPessoaFisica[];

    return finalResult;
  }    
  catch (error) {
    console.log(error);
    return new Error('Erro ao consultar clientes');
  }

};