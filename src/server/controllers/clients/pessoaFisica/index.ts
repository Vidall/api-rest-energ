import * as create from './Create';
import * as UpdateById from './UpdateById';
import * as getById from './GetById';

export const pessoaFisicaControllers = {
  ...create,
  ...UpdateById,
  ...getById
};