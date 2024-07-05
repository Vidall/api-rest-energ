import { validation } from '../../../shared/middlewares/validation';
import * as yup from 'yup';
import { IPessoaFisica } from '../../../database/models/Clients/Cliente';
import { cpf } from 'cpf-cnpj-validator';
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
  endereco: enderecoSchema.required(),
  cpf: yup.string().required().test('cpf', 'Cpf inválido', value => !value || cpf.isValid(value)),
  telefone: yup.string().required().matches(/^\d{10,11}$/, 'Telefone inválido'),
  email: yup.string().required().email(),
  tipo: yup.string().oneOf(['fisico']).optional(),
}).strict().noUnknown();

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().moreThan(0).required()
  })),
  body: getSchema<Omit<IPessoaFisica, 'tipo'>>(bodySchema)
}));

export const updateById = async (req: Request, res: Response) => {
  
  const id = 1;
  const body = req.body;
  const tipo = 'fisico';

  return res.status(StatusCodes.OK).json({id, ...body, tipo});
};