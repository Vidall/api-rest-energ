import { Router } from 'express';
import { routers } from './clients';

const router = Router();

router.get('/', (req, res) => {
  res.send('Tudo ok');
});

routers.pessoaFisica(router);
routers.pessoaJuridica(router);

export { router };