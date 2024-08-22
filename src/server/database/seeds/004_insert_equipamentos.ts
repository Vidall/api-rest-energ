import { Knex } from 'knex';

import { ETableName } from '../ETableName';
import { IEquipamento, IEquipamentoProps } from '../models';

export const seed = async (knex: Knex) => {
  // Validação antes de gerar a seed
  const [{ count }] = await knex(ETableName.equipamento).count<[{ count: number }]>(
    '* as count'
  );
  /*eslint-disable-next-line*/
  const runDev = process.env.NODE_ENV !== 'production'? true : false;

  if (!Number.isInteger(count) || Number(count) > 0) return;
  if (!runDev) return;

  const insertToEquipamentos: IEquipamentoProps[] = equipamentos.map((item) => ({
    ...item,
    equipamento: JSON.stringify(item.equipamento) as IEquipamento
  }));
  await knex(ETableName.equipamento).insert(insertToEquipamentos);
};

const equipamentos= [
  {
    'idCliente': 1,
    'tipo': 'fisico',
    'equipamento': {
      'numeroAlternador': 101,
      'numeroMotor': 101,
      'numero': 'EQP001',
      'anoFabricacao': 2020,
      'potenciaEletrica': 100,
      'potencia': 100,
      'motor': 'Motor A',
      'alternador': 'Alternador A',
      'uscaModelo': 'Modelo A',
      'tensao': '220V',
      'corrente': 100,
      'modeloMotor': 'Modelo Motor A',
      'modeloAlternador': 'Modelo Alternador A',
      'painelControle': 'Painel A',
      'fabricante': 'Fabricante A',
      'fatorPotencia': 0.8,
      'frequencia': 60,
      'horimetro': 100,
      'tipoEquipamento': 'Gerador'
    }
  },
  {
    'idCliente': 2,
    'tipo': 'juridico',
    'equipamento': {
      'numeroAlternador': 102,
      'numeroMotor': 102,
      'numero': 'EQP002',
      'anoFabricacao': 2021,
      'potenciaEletrica': 200,
      'potencia': 200,
      'motor': 'Motor B',
      'alternador': 'Alternador B',
      'uscaModelo': 'Modelo B',
      'tensao': '380V',
      'corrente': 200,
      'modeloMotor': 'Modelo Motor B',
      'modeloAlternador': 'Modelo Alternador B',
      'painelControle': 'Painel B',
      'fabricante': 'Fabricante B',
      'fatorPotencia': 0.9,
      'frequencia': 50,
      'horimetro': 200,
      'tipoEquipamento': 'Gerador'
    }
  },
  {
    'idCliente': 3,
    'tipo': 'fisico',
    'equipamento': {
      'numeroAlternador': 103,
      'numeroMotor': 103,
      'numero': 'EQP003',
      'anoFabricacao': 2019,
      'potenciaEletrica': 150,
      'potencia': 150,
      'motor': 'Motor C',
      'alternador': 'Alternador C',
      'uscaModelo': 'Modelo C',
      'tensao': '110V',
      'corrente': 150,
      'modeloMotor': 'Modelo Motor C',
      'modeloAlternador': 'Modelo Alternador C',
      'painelControle': 'Painel C',
      'fabricante': 'Fabricante C',
      'fatorPotencia': 0.85,
      'frequencia': 60,
      'horimetro': 150,
      'tipoEquipamento': 'Gerador'
    }
  },
  {
    'idCliente': 4,
    'tipo': 'juridico',
    'equipamento': {
      'numeroAlternador': 104,
      'numeroMotor': 104,
      'numero': 'EQP004',
      'anoFabricacao': 2018,
      'potenciaEletrica': 250,
      'potencia': 250,
      'motor': 'Motor D',
      'alternador': 'Alternador D',
      'uscaModelo': 'Modelo D',
      'tensao': '440V',
      'corrente': 250,
      'modeloMotor': 'Modelo Motor D',
      'modeloAlternador': 'Modelo Alternador D',
      'painelControle': 'Painel D',
      'fabricante': 'Fabricante D',
      'fatorPotencia': 0.95,
      'frequencia': 50,
      'horimetro': 250,
      'tipoEquipamento': 'Gerador'
    }
  },
  {
    'idCliente': 5,
    'tipo': 'fisico',
    'equipamento': {
      'numeroAlternador': 105,
      'numeroMotor': 105,
      'numero': 'EQP005',
      'anoFabricacao': 2017,
      'potenciaEletrica': 300,
      'potencia': 300,
      'motor': 'Motor E',
      'alternador': 'Alternador E',
      'uscaModelo': 'Modelo E',
      'tensao': '400V',
      'corrente': 300,
      'modeloMotor': 'Modelo Motor E',
      'modeloAlternador': 'Modelo Alternador E',
      'painelControle': 'Painel E',
      'fabricante': 'Fabricante E',
      'fatorPotencia': 0.92,
      'frequencia': 50,
      'horimetro': 300,
      'tipoEquipamento': 'Gerador'
    }
  },
  {
    'idCliente': 1,
    'tipo': 'juridico',
    'equipamento': {
      'numeroAlternador': 106,
      'numeroMotor': 106,
      'numero': 'EQP006',
      'anoFabricacao': 2022,
      'potenciaEletrica': 350,
      'potencia': 350,
      'motor': 'Motor F',
      'alternador': 'Alternador F',
      'uscaModelo': 'Modelo F',
      'tensao': '220V',
      'corrente': 350,
      'modeloMotor': 'Modelo Motor F',
      'modeloAlternador': 'Modelo Alternador F',
      'painelControle': 'Painel F',
      'fabricante': 'Fabricante F',
      'fatorPotencia': 0.88,
      'frequencia': 60,
      'horimetro': 350,
      'tipoEquipamento': 'Gerador'
    }
  },
  {
    'idCliente': 2,
    'tipo': 'fisico',
    'equipamento': {
      'numeroAlternador': 107,
      'numeroMotor': 107,
      'numero': 'EQP007',
      'anoFabricacao': 2016,
      'potenciaEletrica': 400,
      'potencia': 400,
      'motor': 'Motor G',
      'alternador': 'Alternador G',
      'uscaModelo': 'Modelo G',
      'tensao': '380V',
      'corrente': 400,
      'modeloMotor': 'Modelo Motor G',
      'modeloAlternador': 'Modelo Alternador G',
      'painelControle': 'Painel G',
      'fabricante': 'Fabricante G',
      'fatorPotencia': 0.87,
      'frequencia': 50,
      'horimetro': 400,
      'tipoEquipamento': 'Gerador'
    }
  },
  {
    'idCliente': 3,
    'tipo': 'juridico',
    'equipamento': {
      'numeroAlternador': 108,
      'numeroMotor': 108,
      'numero': 'EQP008',
      'anoFabricacao': 2015,
      'potenciaEletrica': 450,
      'potencia': 450,
      'motor': 'Motor H',
      'alternador': 'Alternador H',
      'uscaModelo': 'Modelo H',
      'tensao': '110V',
      'corrente': 450,
      'modeloMotor': 'Modelo Motor H',
      'modeloAlternador': 'Modelo Alternador H',
      'painelControle': 'Painel H',
      'fabricante': 'Fabricante H',
      'fatorPotencia': 0.89,
      'frequencia': 60,
      'horimetro': 450,
      'tipoEquipamento': 'Gerador'
    }
  },
  {
    'idCliente': 4,
    'tipo': 'fisico',
    'equipamento': {
      'numeroAlternador': 109,
      'numeroMotor': 109,
      'numero': 'EQP009',
      'anoFabricacao': 2014,
      'potenciaEletrica': 500,
      'potencia': 500,
      'motor': 'Motor I',
      'alternador': 'Alternador I',
      'uscaModelo': 'Modelo I',
      'tensao': '440V',
      'corrente': 500,
      'modeloMotor': 'Modelo Motor I',
      'modeloAlternador': 'Modelo Alternador I',
      'painelControle': 'Painel I',
      'fabricante': 'Fabricante I',
      'fatorPotencia': 0.91,
      'frequencia': 50,
      'horimetro': 500,
      'tipoEquipamento': 'Gerador'
    }
  },
  {
    'idCliente': 5,
    'tipo': 'juridico',
    'equipamento': {
      'numeroAlternador': 110,
      'numeroMotor': 110,
      'numero': 'EQP010',
      'anoFabricacao': 2013,
      'potenciaEletrica': 550,
      'potencia': 550,
      'motor': 'Motor J',
      'alternador': 'Alternador J',
      'uscaModelo': 'Modelo J',
      'tensao': '400V',
      'corrente': 550,
      'modeloMotor': 'Modelo Motor J',
      'modeloAlternador': 'Modelo Alternador J',
      'painelControle': 'Painel J',
      'fabricante': 'Fabricante J',
      'fatorPotencia': 0.93,
      'frequencia': 50,
      'horimetro': 550,
      'tipoEquipamento': 'Gerador'
    }
  }
];
