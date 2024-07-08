import * as yup from 'yup';
import { validation } from '../../../shared/middlewares/validation';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pessoaFisicaProviders } from '../../../database/providers';

interface IParamsProps {
  id: number
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  }))
}));

export const getByID = async (req: Request, res: Response) => {

  const id = Number(req.params.id);

  const result = await pessoaFisicaProviders.getById(id);

  if (result.status !== StatusCodes.OK) {
    return res.status(result.status).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(result.status).json(result.data);
};