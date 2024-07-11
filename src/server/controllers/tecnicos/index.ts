import * as create from './Create';
import * as GetById from './GetById';
import * as GetAll from './getAll';
import * as DeleteById from './DeleteById';
import * as UpdateById from './UpdateById';
import * as signin from './Signin';

export const tecnicosControllers = {
  ...create,
  ...GetById,
  ...GetAll,
  ...DeleteById,
  ...UpdateById,
  ...signin
};