import * as pessoaFisica from './pessoaFisicaRoute';
import * as pessoaJuridica from './pessoaJuridicaRoute';

export const routes = {
  ...pessoaFisica,
  ...pessoaJuridica
};