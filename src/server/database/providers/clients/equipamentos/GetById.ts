import { StatusCodes } from 'http-status-codes';
import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { IEquipamentoProps } from '../../../models';

interface IResult {
  status: StatusCodes
  message: string,
  data?: IEquipamentoProps[]
}

export const getById = async (id: number, tipo: 'fisico' | 'juridico'): Promise<IResult> => {
  try {
    const result = await knex(ETableName.equipamento)
      .select('*')
      .where('idCliente', id)
      .andWhere('tipo', tipo);

    if (!result) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: 'Pessoa fisica não localizada'
      };
    };

    const finalResult = result.map(item => {
      const res = {
        ...item,
        equipamento: JSON.parse(item.equipamento as unknown as string)
      } as IEquipamentoProps;

      return res;
    });

    // const finalResult = {
    //   ...result,
    //   equipamento: JSON.parse(result[0].equipamento as unknown as string)
    // } as IEquipamentoProps[];

    return {
      status: StatusCodes.OK,
      message: 'Pessoa Fisica encontrada',
      data: finalResult
    };
  } catch (error) {
    console.log(error);
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Erro ao localizar cliente'
    };
  }
};