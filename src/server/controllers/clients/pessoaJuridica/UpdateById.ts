import { validation } from '../../../shared/middlewares/validation';
import * as yup from 'yup';
import { TUpdatePessoaJuridicaKeys, IpessoaJuridica, IUpdatePessoaJuridica } from '../../../database/models';
import { cnpj } from 'cpf-cnpj-validator';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps {
  id: number
}

const enderecoSchema = yup.object().shape({
  rua: yup.string().required(),
  numero: yup.number().required(),
  bairro: yup.string().required(),
  cidade: yup.string().required(),
});

const bodySchema = yup.object().shape({
  nome: yup.string().required().min(3),
  endereco: enderecoSchema.required(),
  cnpj: yup.string().required().test('cnpj', 'cnpj inválido', value => cnpj.isValid(value || '')),
  tipo: yup.string().oneOf(['juridico']).optional()
});

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  })),
  body: getSchema<IpessoaJuridica>(bodySchema)
}));

export const updateById = async (req: Request, res: Response) => {
  const dataString = JSON.stringify(req.body);
  const dataParse: IUpdatePessoaJuridica = JSON.parse(dataString);

  const allowedKeys = ['nome', 'cnpj', 'tipo', 'endereco'] as TUpdatePessoaJuridicaKeys;

  const receivedKeys = Object.keys(dataParse);
  const hasRequiredProperty = allowedKeys.some(key => key in dataParse);

  if (!hasRequiredProperty) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: `Necessário no minimo: ${allowedKeys}`
      }
    });
  }

  const hasInvalidProperty = receivedKeys.some(key => !allowedKeys.toString().includes(key));

  if (hasInvalidProperty) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: `Propriedades permitidas: ${allowedKeys}`
      }
    });
  }

  return res.status(StatusCodes.ACCEPTED).json(dataParse);

};