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