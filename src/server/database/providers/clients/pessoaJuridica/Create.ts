import { StatusCodes } from 'http-status-codes';
import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { IpessoaJuridica } from '../../../models';

interface Ireturn {
  status: StatusCodes,
  message: string,
  IdCreated?: Pick<IpessoaJuridica, 'id'>
}

export const create = async (pessoaJuridica: Omit<IpessoaJuridica, 'id'>): Promise<Ireturn> => {
  try {    

    //-*-*-*-*-*Verificação do email se é único
    let uniqueEmail = true;

    if (pessoaJuridica.email){

      const [{count}] = await knex(ETableName.pessoaJuridica)        
        .where('email', pessoaJuridica.email)
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

    // Deixar somente os numeros no BD
    const OnlyNumber = pessoaJuridica.cnpj.replace(/\D/g, '');
    
    const [result]  = await knex(ETableName.pessoaJuridica).insert({...pessoaJuridica, cnpj: OnlyNumber}).returning('id');

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