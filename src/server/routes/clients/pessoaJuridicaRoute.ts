import { Router } from 'express';
import { pessoaJuridicaControllers } from '../../controllers/clients/pessoaJuridica';

export const pessoaJuridica = (router: Router) => {
  const routers = [
    router.post('/clientes/pessoaJuridica', pessoaJuridicaControllers.createValidation, pessoaJuridicaControllers.create),
    router.get('/clientes/pessoaJuridica/:id', pessoaJuridicaControllers.GetByIdValidation, pessoaJuridicaControllers.GetById),
    router.get('/clientes/pessoaJuridica/', pessoaJuridicaControllers.getAllValidation, pessoaJuridicaControllers.getAll),
    router.delete('/clientes/pessoaJuridica/:id', pessoaJuridicaControllers.deleteByIdValidation, pessoaJuridicaControllers.deleteById),
    router.put('/clientes/pessoaJuridica/:id', pessoaJuridicaControllers.updateByIdValidation, pessoaJuridicaControllers.updateById),
  ];

  return {...routers};
};