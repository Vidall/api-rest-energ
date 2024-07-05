import { Request, Response } from 'express';
import * as yup from 'yup';
import { cnpj } from 'cpf-cnpj-validator';

import statusCodes from 'http-status-codes';
import { validation } from '../../../shared/middlewares/validation';
import {IpessoaJuridica} from '../../../database/models';

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
  tipo: yup.string().oneOf(['juridico']).optional()
});

export const createValidation = validation((getSchema) => ({
  body: getSchema<Omit<IpessoaJuridica, 'tipo'>>(bodySchema)
}));

export const create = async (req: Request, res: Response) => {
  const id = 1;
  const body = req.body;
  const tipo = 'juridico';

  return res.status(statusCodes.OK).json({id, ...body, tipo});
};