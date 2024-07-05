import * as yup from 'yup';

import { validation } from '../../../shared/middlewares/validation';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

interface IParamProps {
  id?: number
}

export const GetByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const GetById = async (req: Request<IParamProps>, res: Response) => {

  const id = req.params;

  return res.status(StatusCodes.ACCEPTED).json(id);
};