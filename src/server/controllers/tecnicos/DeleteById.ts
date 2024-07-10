import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares/validation';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { tecnicosProviders } from '../../database/providers/tecnicos';
// import { pessoaJuridicaProviders } from '../../database/providers/clients/pessoaJuridica';

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

  const result = await tecnicosProviders.deleteById(id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
};