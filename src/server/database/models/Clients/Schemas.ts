import * as yup from 'yup';

export const equipamentoSchema = yup.object().shape({
  tipoEquipamento: yup.string().required(),
  numero: yup.string().required(),
  anoFabricacao: yup.number().required(),
  potencia: yup.number().required(),
  motor: yup.string().required(),
  alternador: yup.string().required(),
  uscaModelo: yup.string().required(),
  tensao: yup.string().required(),
  corrente: yup.number().required(),
  modeloMotor: yup.string().required(),
  modeloAlternador: yup.string().required(),
  painelControle: yup.string().required(),
  fabricante: yup.string().required(),
  fatorPotencia: yup.number().required(),
  frequencia: yup.number().required(),
  potenciaEletrica: yup.number().required(),
  horimetro: yup.number().required(),
  numeroMotor: yup.number().required(),
  numeroAlternador: yup.number().required(),
});

export const enderecoSchema = yup.object().shape({
  rua: yup.string().required(),
  numero: yup.number().required(),
  bairro: yup.string().required(),
  cidade: yup.string().required(),
});
