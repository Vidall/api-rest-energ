import Knex from 'knex';
import { development, production, test } from './Enviroment';
import 'dotenv/config';

const getEnviroment = () => {
  /*eslint-disable-next-line*/
  switch (process.env.NODE_ENV){
    case 'test':
      return test;
    case 'production':
      return production;
    case 'development':
      return development;
    default:
      return development;
  }
};

export const knex = Knex(getEnviroment());