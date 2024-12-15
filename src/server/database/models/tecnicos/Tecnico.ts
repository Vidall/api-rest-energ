export interface ITecnico {
  id?: number,
  nome: string,
  cpf: string,
  email: string,
  senha: string,
  telefone: string,
  admin: boolean,
  pathAssinatura?: string
}

export interface IUpdateTecnico {
  id?: number,
  nome?: string,
  cpf?: string,
  email?: string,
  senha?: string,
  updateSenha?: string,
  telefone?: string,
  admin?: boolean,
  pathAssinatura?: string
}