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
  tensao?: number,
  corrente?: number,
  modeloMotor?: string,
  modeloAlternador?: string,
  painelControle?: string,
  fabricante?: string,
  fatorPotencia?: number, // vai sair
  frequencia?: number, // vai sair
  potenciaEletrica?: number,
  horimetro?: number,
  numeroMotor?: number,
  numeroAlternador?: number,
}

export interface IEquipamentoProps {
  id?: number,
  tipo: string,
  equipamento: IEquipamento
  idCliente: number
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
}

/*eslint-disable*/
export enum EPessoaFisica {
  cpf,
  nome,
  tipo,
  endereco
}