import { StatusCodes } from 'http-status-codes';
import { knex } from '../../../knex';
import { ETableName } from '../../../ETableName';

interface IReturn  {
  status: StatusCodes,
  message: string
}

export const deleteById = async (id: number): Promise< IReturn> => {
  try {
    const result = await knex(ETableName.equipamento)
      .where('id', id)
      .del();

    if (result > 0) {
      return {
        status: StatusCodes.OK,
        message: 'Registro deletado com sucesso'
      };
    }

    return {
      status: StatusCodes.NOT_FOUND,
      message: 'Registro não encontrado'
    };
  } catch (error) {
    console.log(error);
    return {
      status: StatusCodes.BAD_REQUEST,
      message: 'Erro ao deletar o registro'
    };    
  }
};