import { Router } from 'express';
import { pessoaFisicaRouters } from './clients/pessoaFisicaRoute';

const router = Router();

router.get('/', (req, res) => {
  res.send('Tudo ok');
});

pessoaFisicaRouters(router);

export { router };