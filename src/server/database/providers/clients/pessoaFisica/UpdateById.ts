import { StatusCodes } from 'http-status-codes';
import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { IPessoaFisica } from '../../../models';

interface IReturn {status: number, message?: string}

export const updateById = async (id: number, pessoaFisica: IPessoaFisica): Promise< IReturn > => {
  try {
    //-*-*-*-*-*-*-*-*-*-* Verificação do email se é único
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
        message: 'Email já esta em uso'
      };
    }else {
      /*eslint-disable-next-line*/
      const result = await knex(ETableName.pessoaFisica)
        .update(pessoaFisica)
        .where('id', id);

      return {
        status: StatusCodes.NO_CONTENT,
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