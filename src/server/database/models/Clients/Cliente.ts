export interface Endereco {
  rua: string,
  numero: number,
  bairro: string,
  cidade: string,
}

export interface IPessoaFisica{
  id?: number
  nome: string,
  endereco: Endereco | string,
  email: string,
  cpf: string,
  tipo: 'fisico'
}
export interface IPessoaFisicaUpdate{
  nome?: string,
  endereco?: Endereco,
  email?: string,
  cpf?: string,
  tipo?: 'fisico'
}

export interface IpessoaJuridica{
  id?: number
  nome: string,
  email: string,
  telefone: string
  endereco: Endereco,
  cnpj: string,
  tipo?: 'juridico'
}

/*eslint-disable*/
export enum EPessoaFisica {
  cpf,
  nome,
  tipo,
  endereco

}