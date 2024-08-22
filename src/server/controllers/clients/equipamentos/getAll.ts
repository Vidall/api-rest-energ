import { Request, Response } from 'express';
import * as yup from 'yup';

import { equipamentoProviders } from '../../../database/providers/clients/equipamentos';
import { validation } from '../../../shared/middlewares/validation';
import { StatusCodes } from 'http-status-codes';

interface IQueryProps {
  id?: number,
  page?: number,
  limit?: number,
  filter?: string
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
    id: yup.number().integer().optional().default(0)
  }))
}));

export const getAll = async (req: Request<IQueryProps>, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 7;
  const filter = req.query.filter?.toString() || '';
  const id = Number(req.query.id) || 0;

  const result = await equipamentoProviders.getAll(page, limit, filter, id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Erro ao consultar todos registros'
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
};