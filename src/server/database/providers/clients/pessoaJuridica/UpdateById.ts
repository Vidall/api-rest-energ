import { StatusCodes } from 'http-status-codes';
import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { IEquipamento, IpessoaJuridica } from '../../../models';

interface IReturn {status: number, message?: string}

export const updateById = async (id: number, pessoaJuridica: IpessoaJuridica): Promise< IReturn > => {
  try {
    
    // CNPJ somente com numeros
    const onlyNumberCNPJ = pessoaJuridica.cnpj ? pessoaJuridica.cnpj.replace(/\D/g, '') : pessoaJuridica.cnpj;
    // Endereco para JSON stringFy
    const equipamentoStringFy = JSON.stringify(pessoaJuridica.equipamento) as IEquipamento; 

    // Validação se o e-mail é único  
    if (pessoaJuridica.email){
      let uniqueEmail = true;
    
      const consultByEmail = await knex(ETableName.pessoaJuridica)   
        .select('*')     
        .where('email', pessoaJuridica.email)
        .first();
    
      if (consultByEmail && consultByEmail.id !== id) uniqueEmail = false;
      if (!uniqueEmail) {     
        return {
          status: StatusCodes.BAD_REQUEST,
          message: 'E-mail informado já existe'
        };       
      }   
    }
    
    // Validação se o CNPJ é único    
    if (onlyNumberCNPJ){    
      let uniqueCpf = true;
    
      const consultByCPF = await knex(ETableName.pessoaJuridica) 
        .select('*')       
        .where('cnpj', onlyNumberCNPJ)
        .first();
        
      if (consultByCPF && consultByCPF.id !== id) uniqueCpf = false;
      if (!uniqueCpf) {     
        return {
          status: StatusCodes.BAD_REQUEST,
          message: 'CNPJ já está cadastrado'
        };       
      }        
    } 

    // Chamada para atualizar
    const result = await knex(ETableName.pessoaJuridica)
      .update({...pessoaJuridica, cnpj: onlyNumberCNPJ, equipamento: equipamentoStringFy})
      .where('id', id);

    // Validação se é objeto
    if (!result) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: 'Registro não localizado',
      };
    }else {
      return {
        status: StatusCodes.OK,
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