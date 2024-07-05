import { validation } from '../../../shared/middlewares/validation';
import * as yup from 'yup';
import { IpessoaJuridica } from '../../../database/models';
import { cnpj } from 'cpf-cnpj-validator';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps {
  id?: number
}

const enderecoSchema = yup.object().shape({
  rua: yup.string().required(),
  numero: yup.number().required(),
  bairro: yup.string().required(),
  cidade: yup.string().required(),
});

const bodySchema = yup.object().shape({
  nome: yup.string().required().min(3),
  email: yup.string().required().email(),
  telefone: yup.string().required().matches(/^\d{10,11}$/, 'Telefone inválido'), 
  endereco: enderecoSchema.required(),
  cnpj: yup.string().required().test('cnpj', 'cnpj inválido', value => cnpj.isValid(value || '')),
  tipo: yup.string().oneOf(['juridico']).optional(),
}).strict().noUnknown();

export const updateByIdValidation = validation((getSchema) => ({  
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().moreThan(0).required()
  })),
  body: getSchema<IpessoaJuridica>(bodySchema)
}));

export const updateById = async (req: Request, res: Response) => {
  const body = req.body;
  const id = 1;
  const tipo = 'juridico';

  return res.status(StatusCodes.OK).json({id, ...body, tipo});
};