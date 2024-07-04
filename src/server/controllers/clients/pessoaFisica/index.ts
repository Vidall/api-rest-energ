import * as create from './Create';
import * as UpdateById from './UpdateById';
import * as getById from './GetById';
import * as getAll from './getAll';
import * as deleteById from './DeleteById';

export const pessoaFisicaControllers = {
  ...create,
  ...UpdateById,
  ...getById,
  ...getAll,
  ...deleteById
};