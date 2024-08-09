import { StatusCodes } from 'http-status-codes';
import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { IEquipamento, IEquipamentoProps } from '../../../models';

interface IReturn {status: number, message?: string}

export const updateById = async (id: number, equipamento: IEquipamentoProps): Promise< IReturn > => {
  try {

    // Equipamento para stringfy
    const equipamentoStringfy: IEquipamento = JSON.stringify(equipamento.equipamento) as IEquipamento;  
    
    // Atualização no BD
    const result = await knex(ETableName.equipamento)
      .update({...equipamento, equipamento: equipamentoStringfy})
      .where('id', id);

    if (!result) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: 'Registro não localizado',
      };
    } else {
      return {
        status: StatusCodes.OK,
        message: 'Registro atualizado com sucesso',
      };
    }
  } catch (error) {
    console.log(error);   
    
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Não foi possível atualizar o registro'
    };
  }
};