import { Request, Response } from 'express';
import { validation } from '../../../shared/middlewares/validation';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps {
  id?: number
}

export const deleteByIdValidation = validation((getShema) => ({
  params: getShema<IParamsProps>(yup.object().shape({
    id: yup.number().required().integer().moreThan(0)
  }))
}));

export const deleteById = async (req: Request, res: Response) => {

  const id = req.params;

  return res.status(StatusCodes.OK).json(id);
};