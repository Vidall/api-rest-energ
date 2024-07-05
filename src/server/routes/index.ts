import { Router } from 'express';
import { routes } from './clients';

const router = Router();

router.get('/', (req, res) => {
  res.send('Tudo ok');
});

routes.pessoaFisica(router);
routes.pessoaJuridica(router);

export { router };