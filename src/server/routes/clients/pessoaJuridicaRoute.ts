import { Router } from 'express';

import { pessoaJuridicaControllers } from '../../controllers/clients/pessoaJuridica';

export const pessoaJuridica = (router: Router) => {
  const routers = [
    router.delete('/clientes/pessoaJuridica/:id', pessoaJuridicaControllers.deleteByIdValidation, pessoaJuridicaControllers.deleteById),
    router.put('/clientes/pessoaJuridica/:id', pessoaJuridicaControllers.updateByIdValidation, pessoaJuridicaControllers.updateById),
    router.get('/clientes/pessoaJuridica/:id', pessoaJuridicaControllers.GetByIdValidation, pessoaJuridicaControllers.GetById),
    router.post('/clientes/pessoaJuridica', pessoaJuridicaControllers.createValidation, pessoaJuridicaControllers.create),
    router.get('/clientes/pessoaJuridica', pessoaJuridicaControllers.getAllValidation, pessoaJuridicaControllers.getAll),
  ];

  return {...routers};
};