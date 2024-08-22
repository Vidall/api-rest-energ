import { Router } from 'express';

import { equipamentoControllers } from '../../controllers/clients/equipamentos';

const equipamento = (route: Router) => {
  const routes = [
    route.get('/equipamentos/detalhe/:id', equipamentoControllers.getByIdEquipamentoValidation, equipamentoControllers.getByIdEquipamento),
    route.delete('/equipamentos/:id', equipamentoControllers.deleteByIdValidation, equipamentoControllers.deleteById),
    route.put('/equipamentos/:id', equipamentoControllers.updateByIdValidation, equipamentoControllers.updateById),
    route.get('/equipamentos/:id', equipamentoControllers.getByIdValidation, equipamentoControllers.getByID),
    route.post('/equipamentos', equipamentoControllers.createValidation, equipamentoControllers.create),
    route.get('/equipamentos', equipamentoControllers.getAllValidation, equipamentoControllers.getAll),
  ];

  return routes;
};

export const routesEquipamento = {
  equipamento
};