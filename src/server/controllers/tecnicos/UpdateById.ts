import { validation } from '../../shared/middlewares/validation';
import * as yup from 'yup';
import { cpf } from 'cpf-cnpj-validator';
import { Request, Response } from 'express';
import { tecnicosProviders } from '../../database/providers/tecnicos';
import { MulterFile, IUpdateTecnico } from '../../database/models';
import { s3 } from '../../shared/service/S3Service';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import crypto from 'crypto';

interface IParamsProps {
  id?: number
}

const bodySchema = yup.object().shape({
  id: yup.number().integer().moreThan(0).optional(),
  nome: yup.string().optional().min(3),
  email: yup.string().optional().email(),
  telefone: yup.string().optional().matches(/^\d{10,11}$/, 'Telefone inválido'),
  cpf: yup.string().optional().test('cpf', 'Cpf inválido', value => !value || cpf.isValid(value)),
  senha: yup.string().optional(),
  updateSenha: yup.string().optional(),
  admin: yup.boolean().optional(),
  pathAssinatura: yup.string().optional()
  
});

export const updateByIdValidation = validation((getSchema) => ({  
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().moreThan(0).required()
  })),
  body: getSchema<IUpdateTecnico>(bodySchema)
}));

export const updateById = async (req: Request, res: Response) => {
  const id = Number(req.params.id) ;
  const tecnico = {...req.body};
  const file: MulterFile = req.file!;

  if(req.file) {
    /*eslint-disable-next-line*/
  const bucketName = process.env.BUCKET_NAME;
    // Redimensionando o tamanho da imagem no buffer com a lib sharp
    const buffer = await sharp(req.file?.buffer).resize({width: 300, height: 300}).toBuffer();

    // Params para serem enviados
    const contentType = req.file?.mimetype;

    const getRandomImageName = (bytes = 32): string => crypto.randomBytes(bytes).toString('hex');

    const randomImageName = `${getRandomImageName()}_${Date.now()}`;

    const params = {    
      Bucket: bucketName,
      Key: randomImageName,
      Body: buffer,
      ContentType: contentType
    };

    const command = new PutObjectCommand(params);

    // Envio ao S3
    await s3.send(command);
    
    const result = await tecnicosProviders.updateById(id, tecnico, file, randomImageName || '');
  
    return res.status(result.status).json(result);
  }

  const result = await tecnicosProviders.updateById(id, tecnico);
  
  return res.status(result.status).json(result);

};