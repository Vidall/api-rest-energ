import { StatusCodes } from 'http-status-codes';
import { ETableName } from '../../ETableName';
import { knex } from '../../knex';
import { ITecnico } from '../../models/tecnicos/Tecnico';
import { passWordCrypto } from '../../../shared/service';
import { randomImageName } from '../../../shared/service/S3Service';
import { MulterFile } from '../../models/tecnicos/Multer';

interface Iresult {
  status: StatusCodes,
  message: string,
  data?: {id: number}
}

export const create = async (tecnico: ITecnico, file: MulterFile): Promise<Iresult> => {
  try {
    /* TRATATIVAS*/
    // CPF somente numeros
    const onlyNumberCpf = tecnico.cpf.replace(/\D/g, '');
    // Criptografar a senha
    const senhaCrypto = await passWordCrypto.hashPassWord(tecnico.senha);

    //Validar se email já existe
    if (tecnico.email) {
      let uniqueEmail = true;

      const consult = await knex(ETableName.tecnico)
        .select('*')
        .where('email', tecnico.email)
        .first();
      
      if ( consult ) uniqueEmail = false;

      if (!uniqueEmail) {
        return {
          status: StatusCodes.BAD_REQUEST,
          message: 'E-mail já está em uso'
        };
      }
    }
    //Validar se o cpf já existe
    if (onlyNumberCpf) {
      let uniqueCPF = true;
    
      const consult = await knex(ETableName.tecnico)
        .select('*')
        .where('cpf', onlyNumberCpf)
        .first();
          
      if ( consult ) uniqueCPF = false;
    
      if (!uniqueCPF) {
        return {
          status: StatusCodes.BAD_REQUEST,
          message: 'CPF já está em uso'
        };
      }
    }

    /*eslint-disable-next-line*/
    const bucketName = process.env.BUCKET_NAME;
    /*eslint-disable-next-line*/
    const region = process.env.REGION;

    let caminhoUrl = '';
    if (file) {
      caminhoUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${randomImageName}`;
    }

    // Chamada para cadastrar
    const [result] = await knex(ETableName.tecnico)
      .insert({...tecnico, cpf: onlyNumberCpf, senha: senhaCrypto, pathAssinatura: caminhoUrl})
      .returning('id'); 

    if (!result) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: 'Não foi possivel registrar'
      };
    } else {
      return {
        status: StatusCodes.OK,
        message: 'Cadastrado com sucesso!',
        data: {id: Number(result.id)}
      };
    }
      
  } catch (error) {
    console.log(error);
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Erro ao cadastrar o registro'
    };
  }
};