import * as create from './Create';
import * as updateById from './UpdateById';
import * as getAll from './getAll';
import * as getById from './GetById';
import * as DeleteById from './DeleteById';

export const pessoaJuridicaProviders = {
  ...create,
  ...updateById,
  ...getAll,
  ...getById,
  ...DeleteById
};