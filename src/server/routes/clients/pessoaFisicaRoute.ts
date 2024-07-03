import { Router } from 'express';
import { pessoaFisicaControllers } from '../../controllers/clients/pessoaFisica';

export const pessoaFisicaRouters = (router: Router) => {
  const routers = [
    router.post('/clientes/pessoaFisica', pessoaFisicaControllers.createValidation, pessoaFisicaControllers.create)
  ];

  return {...routers};
};