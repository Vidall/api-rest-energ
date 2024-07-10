import { StatusCodes } from 'http-status-codes';
import { IUpdateTecnico } from '../../models/tecnicos/Tecnico';
import { knex } from '../../knex';
import { ETableName } from '../../ETableName';
import { passWordCrypto } from '../../../shared/service';

interface IResult {
  status: StatusCodes,
  message?: string 
}

export const updateById = async (id: number, tecnico: IUpdateTecnico): Promise<IResult> => {
  try {

    // CPF somente com numeros
    const onlyNumberCPF = tecnico.cpf?.replace(/\D/g, '');

    // Validar se o email é único
    if (tecnico.email) {
      const consultByEmail = await knex(ETableName.tecnico)
        .select('id')
        .where('email', tecnico.email)
        .first();

      if (consultByEmail && consultByEmail?.id !== id) {
        return {
          status: StatusCodes.BAD_REQUEST,
          message: 'E-mail já está cadastrado'
        };
      }
    }
    // Validar se o cpf é único
    if (onlyNumberCPF) {
      const consultByEmail = await knex(ETableName.tecnico)
        .select('id')
        .where('cpf', onlyNumberCPF)
        .first();

      if (consultByEmail && consultByEmail?.id !== id) {
        return {
          status: StatusCodes.BAD_REQUEST,
          message: 'CPF já está cadastrado'
        };
      }
    }

    /*CHAMADA 1*/
    // se quiser trocar a senha, validar a senha antiga     
    if (tecnico.senha) {
      if (!tecnico.updateSenha) return {status: StatusCodes.BAD_REQUEST, message: 'É necessário fornecer uma nova senha'};

      let resultPassWordCrypto = '';
      const consultPassWord = await knex(ETableName.tecnico)
        .select('senha')
        .where('id', id)
        .first();

      if (consultPassWord) resultPassWordCrypto = consultPassWord.senha;

      const senhaVerificada = await passWordCrypto.verifyPassWord(tecnico.senha, resultPassWordCrypto);

      // Senhas antiga incorreta
      if(!senhaVerificada) {
        return {
          status: StatusCodes.BAD_REQUEST,
          message: 'Senha antiga está incorreta'
        };
        // Senha antiga deu mach
      }else {
        const hashPassword = await passWordCrypto.hashPassWord(tecnico.updateSenha);

        delete tecnico.updateSenha;

        const result = await knex(ETableName.tecnico)
          .update({...tecnico, cpf: onlyNumberCPF, senha: hashPassword})
          .where('id', id);

        if (!result) {
          return {
            status: StatusCodes.NOT_FOUND,
            message: 'Registro não encontrado para ser atualizado'
          };
        }else {
          return {
            status: StatusCodes.ACCEPTED,
            message: 'Registro atualizado com sucesso'
          };
        }
      }
    }

    //Chamada do update
    const result = await knex(ETableName.tecnico)
      .update({...tecnico, cpf: onlyNumberCPF})
      .where('id', id);

    if (!result) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: 'Registro não localizado'
      };
    } else {
      return {
        status: StatusCodes.NO_CONTENT,
        message: 'Registro atualizado com sucesso'
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