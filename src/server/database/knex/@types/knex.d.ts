import { IPessoaFisica, IpessoaJuridica } from '../../models';
// import { ITecnico } from '../../models/tecnicos/Tecnico';

declare module 'knex/types/tables' {
  interface Tables {
    pessoaFisica: IPessoaFisica,
    pessoaJuridica: IpessoaJuridica,
    // tecnico: ITecnico
  }
}