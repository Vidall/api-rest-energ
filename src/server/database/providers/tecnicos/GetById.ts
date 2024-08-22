import { ETableName } from '../../ETableName';
import { knex } from '../../knex';
import { ITecnico } from '../../models/tecnicos/Tecnico';

export const getById = async (id: number): Promise<Omit<ITecnico, 'senha'>[] | Error> => {
  try {
    const resultById = await knex(ETableName.tecnico)
      .select('id', 'nome', 'email', 'cpf', 'telefone', 'admin', 'pathAssinatura')
      .where('id', id)
      .first();
    if (typeof resultById === 'object') {      
      return resultById;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return new Error('Erro a consultar os registros');
  }
};