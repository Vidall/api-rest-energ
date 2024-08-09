import * as updateById from './UpdateById';
import * as getById from './GetById';
import * as create from './Create';
import * as getAll from './getAll';
import * as deleteById from './DeleteById';
import * as GetByIdEquipamento from './GetByIdEquipamento';

export const equipamentoControllers = {
  ...create,
  ...getAll,
  ...updateById,
  ...getById,
  ...deleteById,
  ...GetByIdEquipamento
};