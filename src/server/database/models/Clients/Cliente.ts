interface Endereco {
  rua: string,
  numero: number,
  bairro: string,
  cidade: string,
}

export interface IPessoaFisica{
  nome: string,
  endereco: Endereco,
  email: string,
  cpf: string,
  tipo: 'fisico'
}

export interface IpessoaJuridica{
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