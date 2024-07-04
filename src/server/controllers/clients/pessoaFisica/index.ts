import * as create from './Create';
import * as UpdateById from './UpdateById';
import * as getById from './GetById';
import * as getAll from './getAll';

export const pessoaFisicaControllers = {
  ...create,
  ...UpdateById,
  ...getById,
  ...getAll
};