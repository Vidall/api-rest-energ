import { StatusCodes } from 'http-status-codes';
import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { IPessoaFisica } from '../../../models';

interface IResult {
  status: StatusCodes
  message: string,
  data?: IPessoaFisica 
}

export const getById = async (id: number): Promise<IResult> => {
  try {
    const result = await knex(ETableName.pessoaFisica)
      .select('*')
      .where('id', id)
      .first();

    if (!result) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: 'Pessoa fisica não localizada'
      };
    };

    const finalResult = {
      ...result,
      endereco: JSON.parse(result.endereco as unknown as string),
      equipamento: JSON.parse(result.equipamento as unknown as string)
    } as IPessoaFisica;

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