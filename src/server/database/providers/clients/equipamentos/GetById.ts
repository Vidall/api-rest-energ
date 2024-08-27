import { StatusCodes } from 'http-status-codes';
import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { IEquipamentoProps } from '../../../models';

interface IResult {
  status: StatusCodes;
  message: string;
  data?: IEquipamentoProps[];
}

export const getById = async (id: number, tipo: 'fisico' | 'juridico'): Promise<IResult> => {
  try {
    // Consulta o registro do equipamento pelo idCliente e tipo
    const result = await knex(ETableName.equipamento)
      .select('*')
      .where('idCliente', id)
      .andWhere('tipo', tipo);

    // Verifica se algum equipamento foi encontrado
    if (result.length === 0) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: 'Equipamento não localizado'
      };
    }

    // Realiza o parse do campo 'equipamento' se necessário
    const finalResult = result.map(item => ({
      ...item,
      equipamento: item.equipamento // Ajuste conforme o tipo de dado
    })) as IEquipamentoProps[];

    return {
      status: StatusCodes.OK,
      message: 'Equipamentos encontrados',
      data: finalResult
    };
  } catch (error) {
    console.log(error);
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Erro ao localizar equipamentos'
    };
  }
};
