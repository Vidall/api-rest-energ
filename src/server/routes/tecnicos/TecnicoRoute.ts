import { Router } from 'express';
import { tecnicosControllers } from '../../controllers/tecnicos';
import { ensureAuthenticated } from '../../shared/middlewares/EnsureAuthenticated';

import { admin } from '../../shared/middlewares/Admin';

import {upload} from '../../shared/middlewares/uploadSignatureMulter';

export const tecnico = (router: Router) => {
  const routers = [    
    router.post('/tecnicos/signin', tecnicosControllers.signInValidation, tecnicosControllers.signIn),
    
    router.post('/tecnicos/', ensureAuthenticated, upload.single('file'),admin(tecnicosControllers.createValidation), tecnicosControllers.create),
    router.put('/tecnicos/:id', ensureAuthenticated, upload.single('file'), admin(tecnicosControllers.updateByIdValidation), tecnicosControllers.updateById),
    router.get('/tecnicos/:id', ensureAuthenticated, tecnicosControllers.GetByIdValidation, tecnicosControllers.GetById),
    router.get('/tecnicos', ensureAuthenticated, tecnicosControllers.getAllValidation, tecnicosControllers.getAll),
    router.delete('/tecnicos/:id', ensureAuthenticated, tecnicosControllers.deleteByIdValidation, tecnicosControllers.deleteById)
  ];

  return {...routers};
};