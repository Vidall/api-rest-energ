import { validation } from '../../../shared/middlewares/validation';
import * as yup from 'yup';
import { IUpdatePessoaFisica } from '../../../database/models/Clients/Cliente';
import { cpf } from 'cpf-cnpj-validator';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps {
  id: number
}

const enderecoSchema = yup.object().shape({
  rua: yup.string().optional(),
  numero: yup.number().optional(),
  bairro: yup.string().optional(),
  cidade: yup.string().optional(),
});

const bodySchema = yup.object().shape({
  nome: yup.string().optional().min(3),
  endereco: enderecoSchema.optional(),
  cpf: yup.string().optional().test('cpf', 'Cpf inválido', value => !value || cpf.isValid(value)),
  telefone: yup.string().optional().matches(/^\d{10,11}$/, 'Telefone inválido'),
}).noUnknown();

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  })),
  body: getSchema<IUpdatePessoaFisica>(bodySchema)
}));

export const updateById = async (req: Request, res: Response) => {

  const dataString = JSON.stringify(req.body);
  const dataParse: IUpdatePessoaFisica = JSON.parse(dataString);

  const allowedKeys = ['nome', 'endereco', 'cpf', 'telefone', 'email'];
  const receivedKeys = Object.keys(dataParse);
  const hasRequiredProperty = allowedKeys.some(key => key in dataParse);

  if (!hasRequiredProperty) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Para atualização de pessoa fisica deve pelo menos ter um dos seguintes cadastros [nome, endereco, cpf, telefone, tipo]'
      }
    });
  }

  const hasInvalidProperty = receivedKeys.some(key => !allowedKeys.includes(key));

  if (hasInvalidProperty) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O corpo da requisição contém propriedades não permitidas.'
      }
    });
  }

  return res.status(StatusCodes.ACCEPTED).json(dataParse);

};