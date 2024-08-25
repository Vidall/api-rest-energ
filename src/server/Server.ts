import express from 'express';
import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import SwaggerDocs from '../swagger.json';
import cors from 'cors';

import 'dotenv/config';
import './shared/service/TranslationYup';

const server = express();

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerDocs));
server.use(express.json());
server.use(cors({
  /*eslint-disable no-undef*/
  origin: '*'
}));
server.use(router);

export { server };