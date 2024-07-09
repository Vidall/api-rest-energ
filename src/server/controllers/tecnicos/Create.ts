import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';
import { ITecnico } from '../../database/models/tecnicos/Tecnico';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const createValidation = validation((getSchema) => ({
  body: getSchema<Omit<ITecnico, 'id'>>(yup.object().shape({
    nome: yup.string().required(),
    cpf: yup.string().required(),
    email: yup.string().required().email(),
    senha: yup.string().required(),
    telefone: yup.string().required(),
    admin: yup.boolean().required(),
    pathAssinatura: yup.string().required()
  }))
}));

export const create = async (req: Request, res: Response) => {
  const tecnico = req.body;

  res.status(StatusCodes.OK).json(tecnico);
};