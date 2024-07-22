import express from 'express';
import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import SwaggerDocs from '../swagger.json';

import 'dotenv/config';
import './shared/service/TranslationYup';

const server = express();

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerDocs));
server.use(express.json());
server.use(router);

export { server };