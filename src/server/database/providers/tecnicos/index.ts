import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as deletById from './DeleteById';
import * as updateById from './UpdateById';
import * as getByEmail from './GetByEmail';
import * as count from './Count';

export const tecnicosProviders = {
  ...create,
  ...getAll,
  ...getById,
  ...deletById,
  ...updateById,
  ...getByEmail,
  ...count
};