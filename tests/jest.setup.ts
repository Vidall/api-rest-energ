import supertest from 'supertest';

import { server } from '../src/server/Server';
import { knex } from '../src/server/database/knex';

/*eslint-disable no-undef*/
beforeAll(async () => {
  await knex.migrate.latest();
});

afterAll(async () => {
  await knex.destroy();
});

export const testServer = supertest(server);