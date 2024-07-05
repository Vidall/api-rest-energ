import Knex from 'knex';
import { development, production, test } from './Enviroment';

const getEnviroment = () => {
  /*eslint-disable-next-line*/
  switch (process.env.NODE_ENV){
    case 'test':
      return test;
    case 'production':
      return production;
    default:
      return development;}
};

export const knex = Knex(getEnviroment());