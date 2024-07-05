interface Endereco {
  rua: string,
  numero: number,
  bairro: string,
  cidade: string,
}

export interface IPessoaFisica{
  nome: string,
  endereco: Endereco,
  cpf: string,
  tipo: 'fisico'
}

export interface IEnderecoUpdate {
  rua?: string,
  numero?: number,
  bairro?: string,
  cidade?: string,
}

export interface IUpdatePessoaFisica {
  cpf?: string;
  nome?: string;
  endereco?: IEnderecoUpdate;
  telefone?: string
}

export interface IpessoaJuridica{
  nome: string,
  endereco: Endereco,
  cnpj: string,
  tipo?: 'juridico'
}

export interface IUpdatePessoaJuridica {
  cnpj?: string;
  nome?: string;
  endereco?: IEnderecoUpdate;
  telefone?: string
}

/*eslint-disable*/
export type TUpdatePessoaJuridicaKeys = [
  'nome', 
  'cnpj', 
  'tipo', 
  'endereco'
]