import * as yup from 'yup';
import { validation } from '../../../shared/middlewares/validation';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps {
  id: number
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  }))
}));

export const getByID = async (req: Request, res: Response) => {

  const { id } = req.params;

  // Temporário somente para validar teste de id inexistente
  if (Number(id) === 9999) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Cadastro não encontrado'
      }
    });
  }

  return res.status(StatusCodes.OK).json({id});
};