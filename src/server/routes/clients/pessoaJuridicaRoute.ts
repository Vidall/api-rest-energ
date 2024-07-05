import { Router } from 'express';
import { pessoaJuridicaControllers } from '../../controllers/clients/pessoaJuridica';

export const pessoaJuridica = (router: Router) => {
  const routers = [
    router.post('/clientes/pessoaJuridica', pessoaJuridicaControllers.createValidation, pessoaJuridicaControllers.create)
  ];

  return {...routers};
};