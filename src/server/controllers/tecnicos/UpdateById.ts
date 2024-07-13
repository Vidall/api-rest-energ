import { validation } from '../../shared/middlewares/validation';
import * as yup from 'yup';
import { IUpdateTecnico } from '../../database/models/tecnicos/Tecnico';
import { cpf } from 'cpf-cnpj-validator';
import { Request, Response } from 'express';
import { tecnicosProviders } from '../../database/providers/tecnicos';

interface IParamsProps {
  id?: number
}

const bodySchema = yup.object().shape({
  id: yup.number().integer().moreThan(0).optional(),
  nome: yup.string().optional().min(3),
  email: yup.string().optional().email(),
  telefone: yup.string().optional().matches(/^\d{10,11}$/, 'Telefone inválido'),
  cpf: yup.string().optional().test('cpf', 'Cpf inválido', value => !value || cpf.isValid(value)),
  senha: yup.string().optional(),
  updateSenha: yup.string().optional(),
  admin: yup.boolean().optional(),
  pathAssinatura: yup.string().optional()
  
}).strict().noUnknown();

export const updateByIdValidation = validation((getSchema) => ({  
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().moreThan(0).required()
  })),
  body: getSchema<IUpdateTecnico>(bodySchema)
}));

export const updateById = async (req: Request, res: Response) => {
  const id = Number(req.params.id || 0) ;
  const tecnico = req.body;

  const result = await tecnicosProviders.updateById(id, tecnico);

  return res.status(result.status).json(result);
};