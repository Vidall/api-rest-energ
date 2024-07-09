import { validation } from '../../shared/middlewares/validation';
import * as yup from 'yup';
import { ITecnico } from '../../database/models/tecnicos/Tecnico';
import { cpf } from 'cpf-cnpj-validator';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
// import { pessoaJuridicaProviders } from '../../database/providers/clients/pessoaJuridica';

interface IParamsProps {
  id?: number
}

const bodySchema = yup.object().shape({
  id: yup.number().integer().moreThan(0).optional(),
  nome: yup.string().required().min(3),
  email: yup.string().required().email(),
  telefone: yup.string().required().matches(/^\d{10,11}$/, 'Telefone inválido'),
  cpf: yup.string().required().test('cpf', 'cpf inválido', value => cpf.isValid(value || '')),
  senha: yup.string().required(),
  admin: yup.boolean().required(),
  pathAssinatura: yup.string().optional()
  
}).strict().noUnknown();

export const updateByIdValidation = validation((getSchema) => ({  
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().moreThan(0).required()
  })),
  body: getSchema<ITecnico>(bodySchema)
}));

export const updateById = async (req: Request, res: Response) => {
  const id = Number(req.params.id || 0) ;
  const pessoaFisica = req.body;

  // const enderecoParse = JSON.stringify(req.body.endereco);

  // const updateResult = await pessoaJuridicaProviders.updateById(id, {...pessoaFisica, endereco: enderecoParse}); 
  
  // if (updateResult.status !== StatusCodes.OK){
  //   return res.status(updateResult.status).json({
  //     errors: {
  //       default: updateResult.message
  //     }
  //   });
  // } else if (updateResult.status === StatusCodes.OK) {

  //   return res.status(updateResult.status).json({message: updateResult.message});
  // }

  return res.status(StatusCodes.OK).json({id, ...pessoaFisica});
};