import { Knex } from 'knex';
import { ETableName } from '../ETableName';

export const seed = async (knex: Knex) => {
  // Validação antes de gerar a seed
  const [{ count }] = await knex(ETableName.pessoaFisica).count<[{ count: number }]>(
    '* as count'
  );
  const run = true;

  if (!Number.isInteger(count) || Number(count) > 0) return;
  if (!run) return;

  // Convertendo os campos 'endereco' para strings JSON
  const insertToPessoaFisica = pessoasFisica.map((item) => ({
    ...item,
    endereco: JSON.stringify(item.endereco),
  }));
  await knex(ETableName.pessoaFisica).insert(insertToPessoaFisica);
};

// 20 Pessoas fisica IA
const pessoasFisica = [
  {
    nome: 'João Guilherme',
    cpf: '490.757.610-23',
    email: 'joaogui@gmail.com',
    telefone: '24999318788',
    endereco: {
      rua: 'Rua Francelino Alves de Lima',
      numero: 700,
      bairro: 'Nova Angra',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Maria Clara',
    cpf: '305.591.910-72',
    email: 'mariaclara@gmail.com',
    telefone: '21999456789',
    endereco: {
      rua: 'Rua das Flores',
      numero: 123,
      bairro: 'Centro',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Pedro Henrique',
    cpf: '402.619.310-58',
    email: 'pedrohenrique@gmail.com',
    telefone: '21999234567',
    endereco: {
      rua: 'Rua do Sol',
      numero: 456,
      bairro: 'Praia do Anil',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Ana Beatriz',
    cpf: '309.784.600-29',
    email: 'anabeatriz@gmail.com',
    telefone: '21999876543',
    endereco: {
      rua: 'Rua da Paz',
      numero: 789,
      bairro: 'Balneário',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Lucas Gabriel',
    cpf: '278.609.470-12',
    email: 'lucasgabriel@gmail.com',
    telefone: '21999543210',
    endereco: {
      rua: 'Rua da Amizade',
      numero: 101,
      bairro: 'Jacuecanga',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Sofia Helena',
    cpf: '359.713.890-45',
    email: 'sofiahelena@gmail.com',
    telefone: '21999321098',
    endereco: {
      rua: 'Rua das Estrelas',
      numero: 202,
      bairro: 'Vila Velha',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Felipe Augusto',
    cpf: '460.718.520-38',
    email: 'felipeaugusto@gmail.com',
    telefone: '21999765432',
    endereco: {
      rua: 'Rua das Palmeiras',
      numero: 305,
      bairro: 'Marinas',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Gabriela Souza',
    cpf: '570.629.730-49',
    email: 'gabrielasouza@gmail.com',
    telefone: '21999123456',
    endereco: {
      rua: 'Rua das Orquídeas',
      numero: 407,
      bairro: 'Centro',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Rodrigo Almeida',
    cpf: '680.738.840-50',
    email: 'rodrigoalmeida@gmail.com',
    telefone: '21999234567',
    endereco: {
      rua: 'Rua das Acácias',
      numero: 509,
      bairro: 'Nova Angra',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Camila Fernandes',
    cpf: '790.849.950-61',
    email: 'camilaf@gmail.com',
    telefone: '21999876543',
    endereco: {
      rua: 'Rua das Margaridas',
      numero: 611,
      bairro: 'Praia do Anil',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Marcos Vinicius',
    cpf: '801.951.060-72',
    email: 'marcosv@gmail.com',
    telefone: '21999765432',
    endereco: {
      rua: 'Rua dos Girassóis',
      numero: 713,
      bairro: 'Centro',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Isabela Costa',
    cpf: '912.052.170-83',
    email: 'isabelac@gmail.com',
    telefone: '21999123456',
    endereco: {
      rua: 'Rua das Azaleias',
      numero: 815,
      bairro: 'Balneário',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Renato Oliveira',
    cpf: '023.163.280-94',
    email: 'renato@gmail.com',
    telefone: '21999234567',
    endereco: {
      rua: 'Rua dos Lírios',
      numero: 917,
      bairro: 'Nova Angra',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Fernanda Lima',
    cpf: '134.274.390-05',
    email: 'fernandal@gmail.com',
    telefone: '21999876543',
    endereco: {
      rua: 'Rua das Rosas',
      numero: 1019,
      bairro: 'Praia do Anil',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Thiago Rocha',
    cpf: '245.385.400-16',
    email: 'thiagor@gmail.com',
    telefone: '21999765432',
    endereco: {
      rua: 'Rua dos Cravos',
      numero: 1121,
      bairro: 'Centro',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Juliana Martins',
    cpf: '356.496.510-27',
    email: 'julianam@gmail.com',
    telefone: '21999123456',
    endereco: {
      rua: 'Rua dos Ipês',
      numero: 1223,
      bairro: 'Balneário',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Bruno Santos',
    cpf: '467.607.620-38',
    email: 'brunos@gmail.com',
    telefone: '21999234567',
    endereco: {
      rua: 'Rua das Violetas',
      numero: 1325,
      bairro: 'Nova Angra',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Letícia Alves',
    cpf: '578.718.730-49',
    email: 'leticia@gmail.com',
    telefone: '21999876543',
    endereco: {
      rua: 'Rua das Gardênias',
      numero: 1427,
      bairro: 'Praia do Anil',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Rafael Souza',
    cpf: '689.829.840-50',
    email: 'rafaels@gmail.com',
    telefone: '21999765432',
    endereco: {
      rua: 'Rua das Hortências',
      numero: 1529,
      bairro: 'Centro',
      cidade: 'Angra dos Reis',
    },
  },
  {
    nome: 'Carla Ferreira',
    cpf: '790.931.950-61',
    email: 'carla@gmail.com',
    telefone: '21999123456',
    endereco: {
      rua: 'Rua das Alamandas',
      numero: 1631,
      bairro: 'Balneário',
      cidade: 'Angra dos Reis',
    },
  },
];

