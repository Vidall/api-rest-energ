import { Router } from 'express';

import { pessoaFisicaControllers } from '../../controllers/clients/pessoaFisica';

export const pessoaFisica = (router: Router) => {
  const routers = [
    router.delete('/clientes/pessoaFisica/:id', pessoaFisicaControllers.deleteByIdValidation, pessoaFisicaControllers.deleteById),
    router.put('/clientes/pessoaFisica/:id', pessoaFisicaControllers.updateByIdValidation, pessoaFisicaControllers.updateById),
    router.get('/clientes/pessoaFisica/:id', pessoaFisicaControllers.getByIdValidation, pessoaFisicaControllers.getByID),
    router.post('/clientes/pessoaFisica', pessoaFisicaControllers.createValidation, pessoaFisicaControllers.create),
    router.get('/clientes/pessoaFisica', pessoaFisicaControllers.getAllValidation, pessoaFisicaControllers.getAll),
  ];

  return {...routers};
};