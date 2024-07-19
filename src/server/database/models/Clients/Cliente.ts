export interface Endereco {
  rua: string,
  numero: number,
  bairro: string,
  cidade: string,
}

export interface IEquipamento {
  tipoEquipamento?: string
  numero?: string,
  anoFabricacao?: number,
  potencia?: number,
  motor?: string,
  alternador?: string,
  uscaModelo?: string,
  tensao?: string,
  corrente?: number,
  modeloMotor?: string,
  modeloAlternador?: string,
  painelControle?: string,
  fabricante?: string,
  fatorPotencia?: number,
  frequencia?: number,
  potenciaEletrica?: number,
  horimetro?: number,
  numeroMotor?: number,
  numeroAlternador?: number,
}

export interface IPessoaFisica{
  id?: number
  nome: string,
  endereco: Endereco | string,
  email: string,
  cpf: string,
  tipo: 'fisico',
  nomeContato: string,
  possuiContrato: boolean,
  tipoContrato: string
  equipamento?: IEquipamento
}
export interface IPessoaFisicaUpdate{
  nome?: string,
  endereco?: Endereco,
  email?: string,
  cpf?: string,
  tipo?: 'fisico',
  nomeContato?: string,
  possuiContrato?: boolean,
  tipoContrato?: string
  equipamento?: IEquipamento
}

export interface IpessoaJuridica{
  id?: number
  nome: string,
  email: string,
  telefone: string
  endereco: Endereco | string,
  cnpj: string,
  tipo?: 'juridico',
  nomeContato: string,
  possuiContrato: boolean,
  tipoContrato: string
  equipamento?: IEquipamento
}
export interface IpessoaJuridicaUpdate{
  id?: number
  nome?: string,
  email?: string,
  telefone?: string
  endereco?: Endereco | string,
  cnpj?: string,
  tipo?: 'juridico',
  nomeContato?: string,
  possuiContrato?: boolean,
  tipoContrato?: string
  equipamento?: IEquipamento
}

/*eslint-disable*/
export enum EPessoaFisica {
  cpf,
  nome,
  tipo,
  endereco
}