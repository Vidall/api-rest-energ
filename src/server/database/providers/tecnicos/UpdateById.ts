import { StatusCodes } from 'http-status-codes';
import { IUpdateTecnico } from '../../models/tecnicos/Tecnico';
import { knex } from '../../knex';
import { ETableName } from '../../ETableName';
import { passWordCrypto } from '../../../shared/service';
import { MulterFile } from '../../models/tecnicos/Multer';

interface IResult {
  status: StatusCodes,
  message?: string 
}

export const updateById = async (id: number, tecnico: IUpdateTecnico, file?: MulterFile, nameArquivo?: string): Promise<IResult> => {
  try {

    // CPF somente com numeros
    const onlyNumberCPF = tecnico.cpf?.replace(/\D/g, '');

    // Pegar o caminho da assinatura
    let pathAssinatura = tecnico.pathAssinatura;    
    if (file) {
      /*eslint-disable-next-line*/
      const bucketName = process.env.BUCKET_NAME;
      /*eslint-disable-next-line*/
      const region = process.env.REGION;
      pathAssinatura = `https://${bucketName}.s3.${region}.amazonaws.com/${nameArquivo}`;      
    }

    // Validar se o email é único
    if (tecnico.email) {
      let uniqueEmail = true;
      const consultByEmail = await knex(ETableName.tecnico)
        .select('id')
        .where('email', tecnico.email)
        .first();

      if ( consultByEmail && consultByEmail.id !== id) uniqueEmail =false;

      if (!uniqueEmail) {
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
        .where('id', Number(id))
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
          .update({...tecnico, cpf: onlyNumberCPF, senha: hashPassword, pathAssinatura})
          .where('id', Number(id));

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

    //Chamada do updat
    const result = await knex(ETableName.tecnico)
      .update({...tecnico, cpf: onlyNumberCPF, pathAssinatura})
      .where('id', Number(id));

    if (!result) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: 'Registro não localizado'
      };
    } else {
      return {
        status: StatusCodes.OK,
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