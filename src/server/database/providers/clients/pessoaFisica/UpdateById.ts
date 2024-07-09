import { StatusCodes } from 'http-status-codes';
import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { IPessoaFisica } from '../../../models';

interface IReturn {status: number, message?: string}

export const updateById = async (id: number, pessoaFisica: IPessoaFisica): Promise< IReturn > => {
  try {

    // CPF somente com numeros
    const onlyNumberCPF = pessoaFisica.cpf.replace(/\D/g, '');
    // Endereco para stringfy
    const enderecoStringfy = JSON.stringify(pessoaFisica.endereco); 

    // Validação se o e-mail é único  
    if (pessoaFisica.email){
      let uniqueEmail = true;
    
      const consultByEmail = await knex(ETableName.pessoaFisica)   
        .select('*')     
        .where('email', pessoaFisica.email)
        .first();
    
      if (consultByEmail && consultByEmail.id !== id) uniqueEmail = false;
      if (!uniqueEmail) {     
        return {
          status: StatusCodes.BAD_REQUEST,
          message: 'E-mail informado já existe'
        };       
      }   
    }
    
    // Validação se o CPF é único    
    if (onlyNumberCPF){    
      let uniqueCpf = true;
    
      const consultByCPF = await knex(ETableName.pessoaFisica) 
        .select('*')       
        .where('cpf', onlyNumberCPF)
        .first();
        
      if (consultByCPF && consultByCPF.id !== id) uniqueCpf = false;
      if (!uniqueCpf) {     
        return {
          status: StatusCodes.BAD_REQUEST,
          message: 'CPF já está cadastrado'
        };       
      }        
    }  
    
    // Atualização no BD
    const result = await knex(ETableName.pessoaFisica)
      .update({...pessoaFisica, cpf: onlyNumberCPF, endereco: enderecoStringfy})
      .where('id', id);

    if (!result) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: 'Registro não localizado',
      };
    } else {
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