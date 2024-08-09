import { Request, Response } from 'express';
import * as yup from 'yup';
import { cnpj } from 'cpf-cnpj-validator';

import statusCodes, { StatusCodes } from 'http-status-codes';
import { validation } from '../../../shared/middlewares/validation';
import {enderecoSchema, IpessoaJuridica} from '../../../database/models';
import { pessoaJuridicaProviders } from '../../../database/providers/clients/pessoaJuridica';

const bodySchema = yup.object().shape({
  id: yup.number().integer().moreThan(0).optional(),
  nome: yup.string().required().min(3),
  email: yup.string().required().email(),
  telefone: yup.string().required().matches(/^\d{10,11}$/, 'Telefone inválido'),
  endereco: enderecoSchema.required(),
  cnpj: yup.string().required().test('cnpj', 'cnpj inválido', value => cnpj.isValid(value || '')),
  tipo: yup.string().oneOf(['juridico']).optional(),
  nomeContato: yup.string().required(),
  possuiContrato: yup.boolean().required(),
  tipoContrato: yup.string().required().oneOf(['completo', 'padrão'])
});

export const createValidation = validation((getSchema) => ({
  body: getSchema<Omit<IpessoaJuridica, 'tipo'>>(bodySchema)
}));

export const create = async (req: Request, res: Response) => {

  const RequestPessoaFisica = req.body;
  const enderecoParse = JSON.stringify(req.body.endereco);
  const tipo = 'juridico';

  const result = await pessoaJuridicaProviders.create({...RequestPessoaFisica, tipo, endereco: enderecoParse});

  if (result.status !== StatusCodes.CREATED) {
    return res.status(result.status).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(statusCodes.OK).json(result.IdCreated);
};