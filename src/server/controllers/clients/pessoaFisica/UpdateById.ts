import { validation } from '../../../shared/middlewares/validation';
import * as yup from 'yup';
import { cpf } from 'cpf-cnpj-validator';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pessoaFisicaProviders } from '../../../database/providers';
import { enderecoSchema, IPessoaFisicaUpdate } from '../../../database/models';

interface IParamsProps {
  id?: number
}

const bodySchema = yup.object().shape({
  nome: yup.string().optional().min(3),
  endereco: enderecoSchema.optional(),
  cpf: yup.string().optional().test('cpf', 'Cpf inválido', value => !value || cpf.isValid(value)),
  telefone: yup.string().optional().matches(/^\d{10,11}$/, 'Telefone inválido'),
  email: yup.string().optional().email(),
  tipo: yup.string().oneOf(['fisico']).optional(),
  nomeContato: yup.string().optional(),
  possuiContrato: yup.boolean().optional(),
  tipoContrato: yup.string().optional().oneOf(['completo', 'padrão'])
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
  
  if (updateResult.status !== StatusCodes.OK){
    return res.status(updateResult.status).json({
      errors: {
        default: updateResult.message
      }
    });
  }

  return res.status(updateResult.status).json(updateResult);
};

