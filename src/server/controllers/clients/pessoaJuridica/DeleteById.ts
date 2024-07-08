import { Request, Response } from 'express';
import { validation } from '../../../shared/middlewares/validation';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { pessoaJuridicaProviders } from '../../../database/providers/clients/pessoaJuridica';

interface IParamsProps {
  id?: number
}

export const deleteByIdValidation = validation((getShema) => ({
  params: getShema<IParamsProps>(yup.object().shape({
    id: yup.number().required().integer().moreThan(0)
  }))
}));

export const deleteById = async (req: Request, res: Response) => {

  const id = Number(req.params.id);

  const result = await pessoaJuridicaProviders.deleteById(id);

  if (result.status !== StatusCodes.NO_CONTENT) {
    return res.status(result.status).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json();
};