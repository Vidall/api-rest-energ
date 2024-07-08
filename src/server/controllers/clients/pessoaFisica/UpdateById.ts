import { validation } from '../../../shared/middlewares/validation';
import * as yup from 'yup';
import { IPessoaFisicaUpdate } from '../../../database/models/Clients/Cliente';
import { cpf } from 'cpf-cnpj-validator';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pessoaFisicaProviders } from '../../../database/providers';

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
  nome: yup.string().optional().min(3),
  endereco: enderecoSchema.optional(),
  cpf: yup.string().optional().test('cpf', 'Cpf inválido', value => !value || cpf.isValid(value)),
  telefone: yup.string().optional().matches(/^\d{10,11}$/, 'Telefone inválido'),
  email: yup.string().optional().email(),
  tipo: yup.string().oneOf(['fisico']).optional(),
}).strict().noUnknown();

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().moreThan(0).required()
  })),
  body: getSchema<IPessoaFisicaUpdate>(bodySchema)
}));

export const updateById = async (req: Request, res: Response) => {
  
  const id = Number(req.params.id || 0) ;
  const pessoaFisica = req.body;

  const enderecoParse = JSON.stringify(req.body.endereco);

  const updateResult = await pessoaFisicaProviders.updateById(id, {...pessoaFisica, endereco: enderecoParse}); 
  
  if (updateResult.status !== StatusCodes.NO_CONTENT){
    return res.status(updateResult.status).json({
      errors: {
        default: updateResult.message
      }
    });
  } else if (updateResult.status === StatusCodes.NO_CONTENT) {

    return res.status(updateResult.status).json();
  }

};