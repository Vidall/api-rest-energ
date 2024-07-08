import * as yup from 'yup';

import { validation } from '../../../shared/middlewares/validation';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { pessoaJuridicaProviders } from '../../../database/providers/clients/pessoaJuridica';

interface IParamProps {
  id?: number
}

export const GetByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const GetById = async (req: Request<IParamProps>, res: Response) => {

  const id = Number(req.params.id);

  const result = await pessoaJuridicaProviders.getById(id);

  if (result.status !== StatusCodes.OK) {
    return res.status(result.status).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(result.status).json(result.data);
};