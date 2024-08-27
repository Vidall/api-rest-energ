import { StatusCodes } from 'http-status-codes';
import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { IPessoaFisica } from '../../../models';

interface IResult {
  status: StatusCodes;
  message: string;
  data?: IPessoaFisica;
}

export const getById = async (id: number): Promise<IResult> => {
  try {
    // Consulta o registro da pessoa física pelo ID
    const result = await knex(ETableName.pessoaFisica)
      .select('*')
      .where('id', id)
      .first();

    // Verifica se o resultado foi encontrado
    if (!result) {
      return {
        status: StatusCodes.NOT_FOUND, // Código de status apropriado para recurso não encontrado
        message: 'Pessoa física não localizada'
      };
    }

    // Se o campo 'endereco' é JSON nativo, não é necessário JSON.parse
    const finalResult = {
      ...result,
      endereco: result.endereco as IPessoaFisica['endereco'] // Ajuste dependendo do tipo de 'endereco'
    } as IPessoaFisica;

    return {
      status: StatusCodes.OK,
      message: 'Pessoa física encontrada',
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
