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
    
    // Logica de se o horimetro atual for 0 então continua com o horimetro antigo no cadastro
    const HorimetroAtual = ResultEquipamento.horimetro_atual === 0 ? +(equipamento.equipamento.horimetro ?? 0) : +(ResultEquipamento.horimetro_atual ?? 0);
    const KWHAtual = ResultEquipamento.KWH_atual === 0 ? +(equipamento.equipamento.KWH ?? 0) : +(ResultEquipamento.KWH_atual ?? 0);

    // Equipamento para stringfy
    const equipamentoStringfy: IEquipamento = JSON.stringify({...equipamento.equipamento, horimetro: HorimetroAtual, KWH: KWHAtual}) as IEquipamento;
    
    if (equipamento.horimetro_atual! <= ResultEquipamento.horimetro_atual!) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: `O horimetro atual é menor ou igual que o horimetro cadastrado, ${ResultEquipamento.horimetro_atual!}`,
      };
    }

    if (equipamento.KWH_atual! <= ResultEquipamento.KWH_atual!) {
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