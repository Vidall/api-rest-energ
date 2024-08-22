import * as yup from 'yup';
import { validation } from '../../../shared/middlewares/validation';
import { cpf } from 'cpf-cnpj-validator';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pessoaFisicaProviders } from '../../../database/providers';
import { enderecoSchema,IPessoaFisica } from '../../../database/models';

const bodySchema = yup.object().shape({
  id: yup.number().integer().moreThan(0).optional(),
  nome: yup.string().required().min(3),
  email: yup.string().required().email(),
  telefone: yup.string().required().matches(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, 'telefone inválido'),
  endereco: enderecoSchema.required(),
  cpf: yup.string().required().test('cpf', 'cpf inválido', value => cpf.isValid(value || '')),
  tipo: yup.string().oneOf(['fisico']).optional(),

  nomeContato: yup.string().required(),
  possuiContrato: yup.boolean().required(),
  tipoContrato: yup.string().required().oneOf(['completo', 'padrão'])
}).strict().noUnknown();

export const createValidation = validation((getSchema) => ({
  body: getSchema<Omit<IPessoaFisica, 'tipo'>>(bodySchema)
}));

export const create = async (req: Request, res: Response) => {

  const RequestPessoaFisica = req.body;
  const enderecoParse = JSON.stringify(req.body.endereco);
  const tipo = 'fisico';

  const result = await pessoaFisicaProviders.create({...RequestPessoaFisica, tipo, endereco: enderecoParse});

  if (result.status !== StatusCodes.CREATED) {
    return res.status(result.status).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result.IdCreated);
};