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

    const OnlyNumber = pessoaJuridica.cnpj.replace(/\D/g, '');

    //Validação se o e-mail é único    
    if (pessoaJuridica.email){
      let uniqueEmail = true;

      const [{count}] = await knex(ETableName.pessoaJuridica)        
        .where('email', pessoaJuridica.email)
        .count<[{count: number}]>('* as count');

      if (count && count !== 0) uniqueEmail = false;
      if (!uniqueEmail) {     
        return {
          status: StatusCodes.BAD_REQUEST,
          message: 'E-mail informado já existe'
        };       
      }   
    }

    // Validação se o CNPJ é único    
    if (OnlyNumber){    
      let uniqueCpf = true;

      const [{count}] = await knex(ETableName.pessoaJuridica)        
        .where('cnpj', OnlyNumber)
        .count<[{count: number}]>('* as count');
    
      if (count && count !== 0) uniqueCpf = false;
      if (!uniqueCpf) {     
        return {
          status: StatusCodes.BAD_REQUEST,
          message: 'CNPJ já está cadastrado'
        };       
      }        
    }

    // Inserção da pessoa Fisica no BD
    const [result]  = await knex(ETableName.pessoaJuridica).insert({...pessoaJuridica, cnpj: OnlyNumber}).returning('id');

    if (result) {
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