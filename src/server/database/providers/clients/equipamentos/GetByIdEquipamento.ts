import { StatusCodes } from 'http-status-codes';
import { IEquipamento } from '../../../models';
import { knex } from '../../../knex';
import { ETableName } from '../../../ETableName';

interface IResult {
  status: StatusCodes;
  message: string;
  data?: IEquipamento;
}

export const getByIdEquipamento = async (id: number): Promise<IResult> => {
  try {
    // Consulta o registro do equipamento pelo ID
    const result = await knex(ETableName.equipamento)
      .select('*')
      .where('id', id)
      .first(); // Usa .first() para pegar um único resultado

    // Verifica se o resultado foi encontrado
    if (!result) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: 'Equipamento não localizado'
      };
    }

    // Se o campo 'equipamento' é JSON nativo, não é necessário JSON.parse
    const finalResult = {
      ...result,
      equipamento: result.equipamento
    } as IEquipamento;

    return {
      status: StatusCodes.OK,
      message: 'Equipamento encontrado',
      data: finalResult
    };
  } catch (error) {
    console.log(error);
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Erro ao localizar equipamento'
    };
  }
};
