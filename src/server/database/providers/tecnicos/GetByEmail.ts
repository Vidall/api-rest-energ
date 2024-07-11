import { ETableName } from '../../ETableName';
import { knex } from '../../knex';

interface IResult {
  id: number,
  email: string,
  senha: string,
  admin: boolean
}

export const getByEmail = async (email: string): Promise< IResult | Error> => {
  try {
    const result = await knex(ETableName.tecnico)
      .select('id', 'email', 'senha', 'admin')
      .where('email', '=', email)
      .first();

    if (result) return {...result};

    return new Error('Erro ao buscar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao buscar o registro');
  }
};