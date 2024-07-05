import * as yup from 'yup';
import { validation } from '../../../shared/middlewares/validation';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps {
  id: number
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  }))
}));

export const deleteById = async (req: Request, res: Response) => {

  const { id } = req.params;

  return res.status(StatusCodes.OK).json({id});
};