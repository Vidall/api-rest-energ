import { Router } from 'express';
import { pessoaFisicaControllers } from '../../controllers/clients/pessoaFisica';

export const pessoaFisicaRouters = (router: Router) => {
  const routers = [
    router.post('/clientes/pessoaFisica', pessoaFisicaControllers.createValidation, pessoaFisicaControllers.create),
    router.put('/clientes/pessoaFisica/:id', pessoaFisicaControllers.updateByIdValidation, pessoaFisicaControllers.updateById),
    router.get('/clientes/pessoaFisica/:id', pessoaFisicaControllers.getByIdValidation, pessoaFisicaControllers.getByID),
    router.get('/clientes/pessoaFisica', pessoaFisicaControllers.getAllValidation, pessoaFisicaControllers.getAll)
  ];

  return {...routers};
};