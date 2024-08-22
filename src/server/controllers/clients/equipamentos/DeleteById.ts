import { Request, Response } from 'express';
import * as yup from 'yup';

import { equipamentoProviders } from '../../../database/providers/clients/equipamentos';
import { validation } from '../../../shared/middlewares/validation';

interface IParamsProps {
  id: number
}

interface IQueryProps {
  tipo: 'fisico' | 'juridico'
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  })),
  query: getSchema<IQueryProps>(yup.object().shape({
    tipo: yup.string().oneOf(['fisico', 'juridico']).required()
  }))
}));

export const deleteById = async (req: Request, res: Response) => {

  const id = Number(req.params.id);
  const tipo = req.query.tipo as 'fisico' | 'juridico';

  const result = await equipamentoProviders.deleteById(id, tipo);

  return res.status(result.status).json(result);
};