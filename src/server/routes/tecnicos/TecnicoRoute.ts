import { Router } from 'express';
import { tecnicosControllers } from '../../controllers/tecnicos';

export const tecnico = (router: Router) => {
  const routers = [
    router.post('/tecnicos/', tecnicosControllers.createValidation, tecnicosControllers.create),
    router.put('/tecnicos/:id', tecnicosControllers.updateByIdValidation, tecnicosControllers.updateById),
    router.get('/tecnicos/:id', tecnicosControllers.GetByIdValidation, tecnicosControllers.GetById),
    router.get('/tecnicos', tecnicosControllers.getAllValidation, tecnicosControllers.getAll),
    router.delete('/tecnicos/:id', tecnicosControllers.deleteByIdValidation, tecnicosControllers.deleteById)
  ];

  return {...routers};
};