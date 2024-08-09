import { Router } from 'express';
import { routesClientes } from '../routes/clients';
import { routesTecnicos } from '../routes/tecnicos';
import { routesEquipamento } from './clients/equipamentoRoutes';

const router = Router();

router.get('/', (req, res) => {
  res.send('Tudo ok');
});

routesClientes.pessoaFisica(router);
routesClientes.pessoaJuridica(router);
routesTecnicos.tecnico(router);
routesEquipamento.equipamento(router);

export { router };