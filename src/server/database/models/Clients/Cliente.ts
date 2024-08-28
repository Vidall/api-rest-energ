export interface Endereco {
  rua: string,
  numero: number,
  bairro: string,
  cidade: string,
}

export interface IEquipamento {
  tipoEquipamento?: string
  numero?: string,
  anoFabricacao?: string,
  potencia?: string,
  motor?: string,
  alternador?: string,
  uscaModelo?: string,
  tensao?: string,
  corrente?: string,
  modeloMotor?: string,
  modeloAlternador?: string,
  painelControle?: string,
  fabricante?: string,
  fatorPotencia?: string, // vai sair
  frequencia?: string, // vai sair
  potenciaEletrica?: string,
  horimetro?: string,
  numeroMotor?: string,
  numeroAlternador?: string,
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