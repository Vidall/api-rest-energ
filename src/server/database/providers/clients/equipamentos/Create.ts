import { IEquipamentoProps } from '../../../models';
import { ETableName } from '../../../ETableName';
import { StatusCodes } from 'http-status-codes';
import { knex } from '../../../knex';

interface Ireturn {
  status: StatusCodes,
  message?: string,
  IdCreated?: Pick<IEquipamentoProps, 'id'>
}

export const create = async (equipamento: Omit<IEquipamentoProps, 'id'>): Promise<Ireturn> => {
  try {        

    // Inserção do equipamento no BD
    const [result]  = await knex(ETableName.equipamento).insert(equipamento).returning('id');

    if (result) {
      return {
        status: StatusCodes.CREATED,
        message: 'Registro criado com sucesso',
        IdCreated: result
      };    
    }

    return {
      status: StatusCodes.BAD_REQUEST,
      message: 'Erro ao cadastrar o registro'
    };
  } catch (error) {
    console.log(error);
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Erro ao cadastrar o registro'
    };
  }
};