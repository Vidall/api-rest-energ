import { StatusCodes } from 'http-status-codes';
import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { IpessoaJuridica } from '../../../models';

interface IResult {
  status: StatusCodes;
  message: string;
  data?: IpessoaJuridica;
}

export const getById = async (id: number): Promise<IResult> => {
  try {
    // Consulta o registro da pessoa jurídica pelo ID
    const result = await knex(ETableName.pessoaJuridica)
      .select('*')
      .where('id', id)
      .first();

    // Verifica se o resultado foi encontrado
    if (!result) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: 'Pessoa jurídica não localizada'
      };
    }

    // Se o campo 'endereco' é JSON nativo, não é necessário JSON.parse
    const finalResult = {
      ...result,
      endereco: result.endereco // Ajuste dependendo do tipo de 'endereco'
    } as IpessoaJuridica;

    return {
      status: StatusCodes.OK,
      message: 'Pessoa Jurídica encontrada',
      data: finalResult
    };
  } catch (error) {
    console.log(error);
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Erro ao localizar pessoa jurídica'
    };
  }
};
