import * as yup from 'yup';

export const equipamentoSchema = yup.object().shape({
  tipoEquipamento: yup.string().optional(),
  numero: yup.string().optional(),
  anoFabricacao: yup.string().optional(),
  potencia: yup.string().optional(),
  motor: yup.string().optional(),
  alternador: yup.string().optional(),
  uscaModelo: yup.string().optional(),
  tensao: yup.string().optional(),
  corrente: yup.string().optional(),
  modeloMotor: yup.string().optional(),
  modeloAlternador: yup.string().optional(),
  painelControle: yup.string().optional(),
  fabricante: yup.string().optional(),
  fatorPotencia: yup.string().optional(),
  frequencia: yup.string().optional(),
  potenciaEletrica: yup.string().optional(),
  horimetro: yup.string().optional(),
  numeroMotor: yup.string().optional(),
  numeroAlternador: yup.string().optional(),
});

export const enderecoSchema = yup.object().shape({
  rua: yup.string().required(),
  numero: yup.number().required(),
  bairro: yup.string().required(),
  cidade: yup.string().required(),
});
