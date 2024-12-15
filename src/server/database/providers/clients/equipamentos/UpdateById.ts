import { StatusCodes } from 'http-status-codes';
import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { IEquipamento, IEquipamentoProps } from '../../../models';

interface IReturn {status: number, message?: string}

export const updateById = async (id: number, equipamento: IEquipamentoProps): Promise< IReturn > => {
  try {

    const [ResultEquipamento] = await knex(ETableName.equipamento)
      .select('*')
      .where('id', id);

    if (!ResultEquipamento) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: 'Registro não localizado',
      };
    }
    
    const horimetroAtualRecebido = equipamento.horimetro_atual;
    const kwhAtualRecebido = equipamento.KWH_atual;

    const horimetroAtualCadastrado = ResultEquipamento.horimetro_atual;
    const kwhAtualCadastrado = ResultEquipamento.KWH_atual

    const equipamentoCliente: IEquipamento = equipamento.equipamento
    let equipamentoStringfy: IEquipamento = equipamentoCliente;

    // Equipamento para stringfy
    if (horimetroAtualRecebido && horimetroAtualRecebido !== horimetroAtualCadastrado) {
      equipamentoStringfy = JSON.stringify({...ResultEquipamento.equipamento, horimetro: horimetroAtualCadastrado} as IEquipamento) as IEquipamento;
  
    } else if(kwhAtualRecebido && kwhAtualRecebido !== kwhAtualCadastrado) {
      equipamentoStringfy = JSON.stringify({...ResultEquipamento.equipamento, KWH: kwhAtualCadastrado }as IEquipamento) as IEquipamento;
  
    }
    
    if (horimetroAtualRecebido && horimetroAtualRecebido <= horimetroAtualCadastrado!) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: `O horimetro atual é menor ou igual que o horimetro cadastrado, ${ResultEquipamento.horimetro_atual!}`,
      };
    }

    if (kwhAtualRecebido && kwhAtualRecebido <= kwhAtualCadastrado!) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: `O KWH atual é menor ou igual que o KWH cadastrado, ${ResultEquipamento.KWH_atual!}`,
      };
    }
    
    // Atualização no BD
    const result = await knex(ETableName.equipamento)
      .update({...equipamento, equipamento:equipamentoStringfy})
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