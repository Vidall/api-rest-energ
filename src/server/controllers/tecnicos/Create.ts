import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';
import { Request, Response } from 'express';

import { tecnicosProviders } from '../../database/providers/tecnicos';
import { cpf } from 'cpf-cnpj-validator';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import {randomImageName, s3} from '../../shared/service/S3Service';
import { StatusCodes } from 'http-status-codes';
import sharp from 'sharp';
import { MulterFile, ITecnico } from '../../database/models';

export const createValidation = validation((getSchema) => ({
  body: getSchema<Omit<ITecnico, 'id'>>(yup.object().shape({
    nome: yup.string().required(),
    cpf: yup.string().required().test('cpf', 'cpf inválido', value => cpf.isValid(value || '')),
    email: yup.string().required().email(),
    senha: yup.string().required(),
    telefone: yup.string().required(),
    admin: yup.boolean().required(),
    pathAssinatura: yup.string().optional()
  }))
}));

export const create = async (req: Request, res: Response) => {

  const body = {...req.body};
  const file: MulterFile  = req.file!;

  if (!file) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'É necessário cadastrar uma assinatura no campo: file'
      }
    });
  }

  // Redimensionando o tamanho da imagem no buffer com a lib sharp
  const buffer = await sharp(req.file?.buffer).resize({width: 300, height: 300, fit: 'contain'}).toBuffer();

  /*eslint-disable-next-line*/
  const bucketName = process.env.BUCKET_NAME;

  // Params para serem enviados
  const contentType = req.file?.mimetype;

  const params = {    
    Bucket: bucketName,
    Key: randomImageName,
    Body: buffer,
    ContentType: contentType
  };
  
  const command = new PutObjectCommand(params);

  // Envio ao S3
  
  const result = await tecnicosProviders.create(body, file);

  if ( result.status >= 200 && result.status < 300  ) {
    try {
      const uploadResult = await s3.send(command);
      console.log('Resultado do upload:', uploadResult);
      
    } catch (error) {
      console.error('Erro ao fazer o upload da imagem:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Erro ao enviar a imagem para o S3'
        }
      });
    }
  }



  res.status(result.status).json({...result});
};