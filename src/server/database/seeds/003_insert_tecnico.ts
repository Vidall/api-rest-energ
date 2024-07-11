import { Knex } from 'knex';
import { ETableName } from '../ETableName';
import { passWordCrypto } from '../../shared/service';

export const seed = async (knex: Knex) => {
  // Validação antes de gerar a seed
  const [{ count }] = await knex(ETableName.tecnico).count<[{ count: number }]>(
    '* as count'
  );
  /*eslint-disable-next-line*/
  const runDev = process.env.NODE_ENV !== 'production'? true : false;

  if (!Number.isInteger(count) || Number(count) > 0) return;
  if (!runDev) return;
  
  const insertToTecnicoPromises = tecnicos.map(async (item) => ({
    ...item,
    cpf: item.cpf.replace(/\D/g, ''),
    senha: await passWordCrypto.hashPassWord(item.senha)
  }));

  // Somente quando resolver todas as promise
  const insertToTecnico = await Promise.all(insertToTecnicoPromises);

  await knex(ETableName.tecnico).insert(insertToTecnico);
};

// 20 Pessoas fisica IA
const tecnicos = [
  {
    'nome': 'Lucas Vidal',
    'cpf': '917.144.580-32',
    'email': 'lucas@gmail.com',
    'senha': '123456',
    'telefone': '24999318784',
    'admin': true,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Mariana Silva',
    'cpf': '894.234.610-59',
    'email': 'mariana@gmail.com',
    'senha': '123456',
    'telefone': '21999887766',
    'admin': true,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'João Pereira',
    'cpf': '368.654.920-11',
    'email': 'joao@gmail.com',
    'senha': '123456',
    'telefone': '21999654321',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Ana Costa',
    'cpf': '417.265.840-93',
    'email': 'ana@gmail.com',
    'senha': '123456',
    'telefone': '21999443322',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Carlos Mendes',
    'cpf': '128.573.690-58',
    'email': 'carlos@gmail.com',
    'senha': '123456',
    'telefone': '21999221100',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Bruna Oliveira',
    'cpf': '475.890.310-79',
    'email': 'bruna@gmail.com',
    'senha': '123456',
    'telefone': '21999098877',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Felipe Santos',
    'cpf': '639.278.450-20',
    'email': 'felipe@gmail.com',
    'senha': '123456',
    'telefone': '21998876655',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Júlia Almeida',
    'cpf': '813.564.370-21',
    'email': 'julia@gmail.com',
    'senha': '123456',
    'telefone': '21998654433',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Ricardo Gomes',
    'cpf': '290.476.580-03',
    'email': 'ricardo@gmail.com',
    'senha': '123456',
    'telefone': '21998432211',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Laura Rocha',
    'cpf': '712.598.470-65',
    'email': 'laura@gmail.com',
    'senha': '123456',
    'telefone': '21998210099',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'André Souza',
    'cpf': '346.908.230-87',
    'email': 'andre@gmail.com',
    'senha': '123456',
    'telefone': '21998098877',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Fernanda Lima',
    'cpf': '509.182.640-34',
    'email': 'fernanda@gmail.com',
    'senha': '123456',
    'telefone': '21997886655',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Mateus Cardoso',
    'cpf': '765.403.290-12',
    'email': 'mateus@gmail.com',
    'senha': '123456',
    'telefone': '21997674433',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Amanda Ferreira',
    'cpf': '284.620.970-56',
    'email': 'amanda@gmail.com',
    'senha': '123456',
    'telefone': '21997452211',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Rodrigo Ribeiro',
    'cpf': '157.492.680-01',
    'email': 'rodrigo@gmail.com',
    'senha': '123456',
    'telefone': '21997230099',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Isabela Araújo',
    'cpf': '398.521.740-20',
    'email': 'isabela@gmail.com',
    'senha': '123456',
    'telefone': '21997018877',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Gustavo Nogueira',
    'cpf': '604.329.860-45',
    'email': 'gustavo@gmail.com',
    'senha': '123456',
    'telefone': '21996806655',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Renata Barros',
    'cpf': '713.847.910-88',
    'email': 'renata@gmail.com',
    'senha': '123456',
    'telefone': '21996554433',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Eduardo Teixeira',
    'cpf': '472.159.360-50',
    'email': 'eduardo@gmail.com',
    'senha': '123456',
    'telefone': '21996332211',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Camila Farias',
    'cpf': '356.748.120-67',
    'email': 'camila@gmail.com',
    'senha': '123456',
    'telefone': '21996110099',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  },
  {
    'nome': 'Vinícius Vieira',
    'cpf': '625.473.580-21',
    'email': 'vinicius@gmail.com',
    'senha': '123456',
    'telefone': '21995998877',
    'admin': false,
    'pathAssinatura': 'caminho/da/assinatura'
  }
];

