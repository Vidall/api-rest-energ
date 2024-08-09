import * as create from './Create';
import * as updateById from './UpdateById';
import * as getAll from './getAll';
import * as getById from './GetById';
import * as DeleteById from './DeleteById';
import * as getByIdEquipamento from './GetByIdEquipamento';

export const equipamentoProviders = {
  ...create,
  ...updateById,
  ...getAll,
  ...getById,
  ...DeleteById,
  ...getByIdEquipamento
};