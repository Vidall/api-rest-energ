import { validation } from '../../../shared/middlewares/validation';
import * as yup from 'yup';
import { enderecoSchema, IpessoaJuridicaUpdate } from '../../../database/models';
import { cnpj } from 'cpf-cnpj-validator';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pessoaJuridicaProviders } from '../../../database/providers/clients/pessoaJuridica';

interface IParamsProps {
  id?: number
}

const bodySchema = yup.object().shape({
  id: yup.number().integer().moreThan(0).optional(),
  nome: yup.string().optional().min(3),
  email: yup.string().optional().email(),
  telefone: yup.string().optional().matches(/^\d{10,11}$/, 'Telefone inválido'), 
  endereco: enderecoSchema.optional(),
  cnpj: yup.string().optional().test('cnpj', 'cnpj inválido', value => !value || cnpj.isValid(value)),
  tipo: yup.string().oneOf(['juridico']).optional(),
  nomeContato: yup.string().optional(),
  possuiContrato: yup.boolean().optional(),
  tipoContrato: yup.string().optional().oneOf(['completo', 'padrão'])

}).strict().noUnknown();

export const updateByIdValidation = validation((getSchema) => ({  
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().moreThan(0).required()
  })),
  body: getSchema<IpessoaJuridicaUpdate>(bodySchema)
}));

export const updateById = async (req: Request, res: Response) => {
  const id = Number(req.params.id || 0) ;
  const pessoaFisica = req.body;

  const enderecoParse = JSON.stringify(req.body.endereco);

  const updateResult = await pessoaJuridicaProviders.updateById(id, {...pessoaFisica, endereco: enderecoParse}); 
  
  if (updateResult.status !== StatusCodes.OK){
    return res.status(updateResult.status).json({
      errors: {
        default: updateResult.message
      }
    });
  } else if (updateResult.status === StatusCodes.OK) {

    return res.status(updateResult.status).json(updateResult);
  }
};