import * as yup from 'yup';

export const equipamentoSchema = yup.object().shape({
  tipoEquipamento: yup.string().required(),
  numero: yup.string().required(),
  anoFabricacao: yup.string().required(),
  potencia: yup.string().required(),
  motor: yup.string().required(),
  alternador: yup.string().required(),
  uscaModelo: yup.string().required(),
  tensao: yup.string().required(),
  corrente: yup.string().required(),
  modeloMotor: yup.string().required(),
  modeloAlternador: yup.string().required(),
  painelControle: yup.string().required(),
  fabricante: yup.string().required(),
  fatorPotencia: yup.string().required(),
  frequencia: yup.string().required(),
  potenciaEletrica: yup.string().required(),
  horimetro: yup.string().required(),
  numeroMotor: yup.string().required(),
  numeroAlternador: yup.string().required(),
});

export const enderecoSchema = yup.object().shape({
  rua: yup.string().required(),
  numero: yup.number().required(),
  bairro: yup.string().required(),
  cidade: yup.string().required(),
});
