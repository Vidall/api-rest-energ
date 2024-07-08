import { IPessoaFisica } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    pessoaFisica: IPessoaFisica,
    // pessoaJuridica: IpessoaJuridica,
  }
}