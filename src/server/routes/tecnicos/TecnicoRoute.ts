import { Router } from 'express';

import { ensureAuthenticated } from '../../shared/middlewares/EnsureAuthenticated';
import {upload} from '../../shared/middlewares/uploadSignatureMulter';
import { tecnicosControllers } from '../../controllers/tecnicos';
import { admin } from '../../shared/middlewares/Admin';

export const tecnico = (router: Router) => {
  const routers = [    
    router.post('/tecnicos/signin', tecnicosControllers.signInValidation, tecnicosControllers.signIn),
    
    router.put('/tecnicos/:id', upload.single('file'), tecnicosControllers.updateByIdValidation, tecnicosControllers.updateById),
    router.post('/tecnicos/', upload.single('file'),tecnicosControllers.createValidation, tecnicosControllers.create),
    router.delete('/tecnicos/:id', tecnicosControllers.deleteByIdValidation, tecnicosControllers.deleteById),
    router.get('/tecnicos/:id', tecnicosControllers.GetByIdValidation, tecnicosControllers.GetById),
    router.get('/tecnicos', tecnicosControllers.getAllValidation, tecnicosControllers.getAll),
  ];

  return {...routers};
};