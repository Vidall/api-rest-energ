import * as create from './Create';
import * as GetById from './GetById';
import * as GetAll from './getAll';
import * as DeleteById from './DeleteById';
import * as UpdateById from './UpdateById';

export const pessoaJuridicaControllers = {
  ...create,
  ...GetById,
  ...GetAll,
  ...DeleteById,
  ...UpdateById
};