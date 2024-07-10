import * as yup from 'yup';

import { validation } from '../../shared/middlewares/validation';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { tecnicosProviders } from '../../database/providers/tecnicos';

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

  const result = await tecnicosProviders.getById(id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
};