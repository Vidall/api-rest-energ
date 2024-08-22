import { Request, Response } from 'express';
import * as yup from 'yup';

import { equipamentoProviders } from '../../../database/providers/clients/equipamentos';
import { equipamentoSchema, IEquipamentoProps } from '../../../database/models';
import { validation } from '../../../shared/middlewares/validation';
import { ETipoCliente } from '../../../database/ETipoClienteName';

const bodySchema = yup.object().shape({
  id: yup.number().integer().moreThan(0).optional(),
  tipo: yup.string().oneOf([ETipoCliente.fisico, ETipoCliente.juridico]).required(),
  equipamento: equipamentoSchema.required(),
  idCliente: yup.number().required().moreThan(0)
}).strict().noUnknown();

export const createValidation = validation((getSchema) => ({
  body: getSchema<Omit<IEquipamentoProps, 'id'>>(bodySchema)
}));

export const create = async (req: Request, res: Response) => {

  const RequestEquipamento = req.body;

  const result = await equipamentoProviders.create(RequestEquipamento);

  return res.status(result.status).json({status: result.status, message: result.message});
};