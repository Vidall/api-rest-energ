import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Tudo ok');
});

export { router };