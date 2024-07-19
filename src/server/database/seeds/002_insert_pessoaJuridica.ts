import { Knex } from 'knex';
import { ETableName } from '../ETableName';
import { IEquipamento, IpessoaJuridica } from '../models';

export const seed = async (knex: Knex) => {
  // Validação antes de gerar a seed
  const [{ count }] = await knex(ETableName.pessoaJuridica).count<[{ count: number }]>(
    '* as count'
  );
  /*eslint-disable-next-line*/
  const runDev = process.env.NODE_ENV !== 'production'? true : false;

  if (!Number.isInteger(count) || Number(count) > 0) return;
  if (!runDev) return;

  // Convertendo os campos 'endereco' para strings JSON
  const insertToPessoaJuridica: Omit<IpessoaJuridica, 'tipo'>[] = pessoasJuridica.map((item) => ({
    ...item,
    cnpj: item.cnpj.replace(/\D/g, ''),
    endereco: JSON.stringify(item.endereco),
    equipamento: JSON.stringify(Equipamento) as IEquipamento,
    nomeContato: 'Andre',
    possuiContrato: true,
    tipoContrato: 'padrão'
  }));
  await knex(ETableName.pessoaJuridica).insert(insertToPessoaJuridica);
};

const Equipamento = {
  'tipoEquipamento': 'Gerador Elétrico',
  'numero': 'GE-123456',
  'anoFabricacao': 2020,
  'potencia': 150,
  'motor': 'Motor Diesel 6.8L',
  'alternador': 'Alternador Brushless',
  'uscaModelo': 'USC-Model-X',
  'tensao': '380V',
  'corrente': 400,
  'modeloMotor': 'MD-6800',
  'modeloAlternador': 'AL-5000',
  'painelControle': 'Painel Digital com Display LCD',
  'fabricante': 'Geradores Brasil',
  'fatorPotencia': 0.8,
  'frequencia': 60,
  'potenciaEletrica': 120,
  'horimetro': 250,
  'numeroMotor': 987654,
  'numeroAlternador': 123456
};

// 20 Pessoas fisica IA
const pessoasJuridica = [
  {
    nome: 'Restaurante Mais Sabor LTDA',
    email: 'maissabor@gmail.com',
    telefone: '24999318787',
    cnpj: '51.524.930/0001-85',
    endereco: {
      rua: 'Rua Francelino Alves de Lima',
      numero: 1,
      bairro: 'Nova Angra',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Supermercado Popular LTDA',
    email: 'superpopular@gmail.com',
    telefone: '24999318788',
    cnpj: '37.269.657/0001-32',
    endereco: {
      rua: 'Rua das Palmeiras',
      numero: 10,
      bairro: 'Centro',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Farmácia Saúde LTDA',
    email: 'farmaciasaude@gmail.com',
    telefone: '24999318789',
    cnpj: '42.978.361/0001-12',
    endereco: {
      rua: 'Avenida Brasil',
      numero: 15,
      bairro: 'Balneário',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Padaria Pão Quente LTDA',
    email: 'paoquente@gmail.com',
    telefone: '24999318790',
    cnpj: '68.543.987/0001-45',
    endereco: {
      rua: 'Rua do Comércio',
      numero: 20,
      bairro: 'Vila Velha',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Lanchonete Delícia LTDA',
    email: 'delicia@gmail.com',
    telefone: '24999318791',
    cnpj: '78.654.329/0001-67',
    endereco: {
      rua: 'Rua das Flores',
      numero: 25,
      bairro: 'Jardim',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Academia Fitness LTDA',
    email: 'fitness@gmail.com',
    telefone: '24999318792',
    cnpj: '56.789.123/0001-89',
    endereco: {
      rua: 'Rua do Esporte',
      numero: 30,
      bairro: 'Praia do Anil',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Clínica Médica LTDA',
    email: 'clinica@gmail.com',
    telefone: '24999318793',
    cnpj: '98.765.432/0001-21',
    endereco: {
      rua: 'Rua da Saúde',
      numero: 35,
      bairro: 'Centro',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Livraria Cultura LTDA',
    email: 'cultura@gmail.com',
    telefone: '24999318794',
    cnpj: '94.638.678/0001-48',
    endereco: {
      rua: 'Rua das Letras',
      numero: 40,
      bairro: 'Jardim',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Pet Shop Animal LTDA',
    email: 'petshop@gmail.com',
    telefone: '24999318795',
    cnpj: '14.194.796/0001-75',
    endereco: {
      rua: 'Rua dos Bichos',
      numero: 45,
      bairro: 'Vila Velha',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Oficina Mecânica LTDA',
    email: 'mecanica@gmail.com',
    telefone: '24999318796',
    cnpj: '94.985.115/0001-26',
    endereco: {
      rua: 'Rua das Ferramentas',
      numero: 50,
      bairro: 'Praia do Anil',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Sorveteria Gelada LTDA',
    email: 'gelada@gmail.com',
    telefone: '24999318797',
    cnpj: '56.789.012/0001-90',
    endereco: {
      rua: 'Rua dos Doces',
      numero: 55,
      bairro: 'Balneário',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Loja de Roupas LTDA',
    email: 'roupas@gmail.com',
    telefone: '24999318798',
    cnpj: '67.890.123/0001-12',
    endereco: {
      rua: 'Rua da Moda',
      numero: 60,
      bairro: 'Centro',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Papelaria Escolar LTDA',
    email: 'papelaria@gmail.com',
    telefone: '24999318799',
    cnpj: '78.901.234/0001-34',
    endereco: {
      rua: 'Rua dos Estudos',
      numero: 65,
      bairro: 'Jardim',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Churrascaria Bom Gosto LTDA',
    email: 'bomgosto@gmail.com',
    telefone: '24999318800',
    cnpj: '89.012.345/0001-56',
    endereco: {
      rua: 'Rua do Sabor',
      numero: 70,
      bairro: 'Nova Angra',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Hotel Conforto LTDA',
    email: 'conforto@gmail.com',
    telefone: '24999318801',
    cnpj: '90.123.456/0001-78',
    endereco: {
      rua: 'Rua do Turismo',
      numero: 75,
      bairro: 'Praia do Anil',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Salão de Beleza LTDA',
    email: 'beleza@gmail.com',
    telefone: '24999318802',
    cnpj: '01.234.567/0001-90',
    endereco: {
      rua: 'Rua da Estética',
      numero: 80,
      bairro: 'Balneário',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Escola de Idiomas LTDA',
    email: 'idiomas@gmail.com',
    telefone: '24999318803',
    cnpj: '12.345.678/0001-12',
    endereco: {
      rua: 'Rua das Palavras',
      numero: 85,
      bairro: 'Centro',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Transportadora Rápido LTDA',
    email: 'rapido@gmail.com',
    telefone: '24999318804',
    cnpj: '23.456.789/0001-34',
    endereco: {
      rua: 'Rua da Logística',
      numero: 90,
      bairro: 'Vila Velha',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Construtora Forte LTDA',
    email: 'forte@gmail.com',
    telefone: '24999318805',
    cnpj: '34.567.890/0001-56',
    endereco: {
      rua: 'Rua das Obras',
      numero: 95,
      bairro: 'Jardim',
      cidade: 'Angra dos Reis'
    }
  },
  {
    nome: 'Agência de Viagens LTDA',
    email: 'viagens@gmail.com',
    telefone: '24999318806',
    cnpj: '45.678.901/0001-78',
    endereco: {
      rua: 'Rua dos Destinos',
      numero: 100,
      bairro: 'Praia do Anil',
      cidade: 'Angra dos Reis'
    }
  }
];

