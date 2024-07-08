import { StatusCodes } from 'http-status-codes';
import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { IpessoaJuridica } from '../../../models';

interface IReturn {status: number, message?: string}

export const updateById = async (id: number, pessoaJuridica: IpessoaJuridica): Promise< IReturn > => {
  try {
    // Deixar a string de cnpj com somente numeros
    const OnlyNumber = pessoaJuridica.cnpj.replace(/\D/g, '');
    
    //-*-*-*-*-*-*-*-*-*-* Verificação do email se é único
    let uniqueEmail = true;

    if (pessoaJuridica.email){    
      const consult = await knex(ETableName.pessoaJuridica)    
        .select('*')    
        .where('email', pessoaJuridica.email)
        .first();
    
      if (consult?.cnpj !== OnlyNumber) uniqueEmail = false;
    }
    //-*-*-*-*-*-*-*-*-*-*
    
    if (!uniqueEmail) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: 'Email já esta em uso'
      };
    }else {
      /*eslint-disable-next-line*/
      const result = await knex(ETableName.pessoaJuridica)
        .update({...pessoaJuridica, cnpj: OnlyNumber})
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