import { StatusCodes } from 'http-status-codes';
import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { IPessoaFisica } from '../../../models';

interface Ireturn {
  status: StatusCodes,
  message: string,
  IdCreated?: Pick<IPessoaFisica, 'id'>
}

export const create = async (pessoaFisica: Omit<IPessoaFisica, 'id'>): Promise<Ireturn> => {
  try {    

    //-*-*-*-*-*Verificação do email se é único
    let uniqueEmail = true;

    if (pessoaFisica.email){

      const [{count}] = await knex(ETableName.pessoaFisica)        
        .where('email', pessoaFisica.email)
        .count<[{count: number}]>('* as count');

      if (count !== 0) uniqueEmail = false;
    }
    //-*-*-*-*-*-*-*-*-*-*

    if (!uniqueEmail) {     
      return {
        status: StatusCodes.BAD_REQUEST,
        message: 'E-mail informado já existe'
      };       
    }
    
    const [result]  = await knex(ETableName.pessoaFisica).insert(pessoaFisica).returning('id');

    if (typeof result === 'object') {
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