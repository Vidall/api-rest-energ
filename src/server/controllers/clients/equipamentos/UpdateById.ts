import { Request, Response } from 'express';
import * as yup from 'yup';

import { equipamentoProviders } from '../../../database/providers/clients/equipamentos';
import { validation } from '../../../shared/middlewares/validation';
import { ETipoCliente } from '../../../database/ETipoClienteName';
import {  equipamentoSchema } from '../../../database/models';
import { IEquipamentoProps } from '../../../database/models';

interface IParamsProps {
  id?: number
}

const bodySchema = yup.object().shape({
  id: yup.number().integer().moreThan(0).optional(),
  tipo: yup.string().oneOf([ETipoCliente.fisico, ETipoCliente.juridico]).required(),
  equipamento: equipamentoSchema.required(),
  idCliente: yup.number().required().moreThan(0)
}).strict().noUnknown();

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().moreThan(0).required()
  })),
  body: getSchema<Omit<IEquipamentoProps, 'id'>>(bodySchema)
}));

export const updateById = async (req: Request, res: Response) => {
  
  const id = Number(req.params.id || 0) ;
  const equipamento = req.body;

  const result = await equipamentoProviders.updateById(id, equipamento);

  return res.status(result.status).json({status: result.status, message: result.message});
};

