import { ETableName } from '../../ETableName';
import { knex } from '../../knex';
import { ITecnico } from '../../models/tecnicos/Tecnico';

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<Omit<ITecnico, 'senha'>[] | Error> => {
  try {
    const result = await knex(ETableName.tecnico)
      .select('id', 'nome', 'email', 'cpf', 'telefone', 'admin', 'pathAssinatura')
      .where('id', id)
      .orWhere('nome', 'like', `%${filter}%`)
      .orWhere('cpf', 'like', `%${filter}%`)
      .offset((page - 1 ) * limit)
      .limit(limit); 

    if ( id > 0 && result.every(item => item.id !== id)) {
      const resultById = await knex(ETableName.tecnico)
        .select('id', 'nome', 'email', 'cpf', 'telefone', 'admin', 'pathAssinatura')
        .where('id', id)
        .first();

      if (resultById) return [...result, resultById];
    }

    if (typeof result === 'object') {      
      return result;
    } else {
      return [];
    }

  } catch (error) {
    console.log(error);
    return new Error('Erro a consultar os registros');
  }
};