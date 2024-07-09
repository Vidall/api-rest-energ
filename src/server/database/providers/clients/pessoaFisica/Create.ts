import { StatusCodes } from 'http-status-codes';
import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { IPessoaFisica } from '../../../models';

interface Ireturn {
  status: StatusCodes,
  message?: string,
  IdCreated?: Pick<IPessoaFisica, 'id'>
}

export const create = async (pessoaFisica: Omit<IPessoaFisica, 'id'>): Promise<Ireturn> => {
  try {    

    const OnlyNumber = pessoaFisica.cpf.replace(/\D/g, '');
    const enderecoStringfy = JSON.stringify(pessoaFisica.endereco);

    //Validação se o e-mail é único    
    if (pessoaFisica.email){
      let uniqueEmail = true;

      const [{count}] = await knex(ETableName.pessoaFisica)        
        .where('email', pessoaFisica.email)
        .count<[{count: number}]>('* as count');

      if (count && count !== 0) uniqueEmail = false;
      if (!uniqueEmail) {     
        return {
          status: StatusCodes.BAD_REQUEST,
          message: 'E-mail informado já existe'
        };       
      }   
    }

    // Validação se o CPF é único    
    if (OnlyNumber){    
      let uniqueCpf = true;

      const [{count}] = await knex(ETableName.pessoaFisica)        
        .where('cpf', OnlyNumber)
        .count<[{count: number}]>('* as count');
    
      if (count && count !== 0) uniqueCpf = false;
      if (!uniqueCpf) {     
        return {
          status: StatusCodes.BAD_REQUEST,
          message: 'CPF já está cadastrado'
        };       
      }        
    }

    // Inserção da pessoa Fisica no BD
    const [result]  = await knex(ETableName.pessoaFisica).insert({...pessoaFisica, cpf: OnlyNumber, endereco: enderecoStringfy}).returning('id');

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