import * as yup from 'yup';

import { validation } from '../../shared/middlewares/validation';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
// import { pessoaJuridicaProviders } from '../../../database/providers/clients/pessoaJuridica';

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

  const result = ({page, limit, filter, id});

  // const result = await pessoaJuridicaProviders.getAll(page, limit, filter, id);

  // if (result instanceof Error) {
  //   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //     errors: {
  //       default: result.message
  //     }
  //   });
  // }

  // res.setHeader('access-control-expose-headers', 'x-total-count');
  // res.setHeader('x-total-count', 1);

  return res.status(StatusCodes.OK).json(result);
};