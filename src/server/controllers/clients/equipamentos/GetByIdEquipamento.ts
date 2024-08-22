import { Request, Response } from 'express';
import * as yup from 'yup';

import { equipamentoProviders } from '../../../database/providers/clients/equipamentos';
import { validation } from '../../../shared/middlewares/validation';

interface IParamsProps {
  id: number
}

export const getByIdEquipamentoValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)    
  }))
}));

export const getByIdEquipamento = async (req: Request, res: Response) => {

  const id = Number(req.params.id);

  const result = await equipamentoProviders.getByIdEquipamento(id);

  return res.status(result.status).json(result.data);
};