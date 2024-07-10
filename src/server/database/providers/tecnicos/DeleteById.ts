import { ETableName } from '../../ETableName';
import { knex } from '../../knex';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {

    const resultById = await knex(ETableName.tecnico)      
      .where('id', Number(id))
      .del();

    if (resultById > 0) {      
      return;
    }

    return new Error('Registro não localizado');
  
  } catch (error) {
    console.log(error);
    return new Error('Erro a consultar os registros');
  }
};