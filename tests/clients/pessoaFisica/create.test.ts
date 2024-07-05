import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../jest.setup';

/*eslint-disable*/

describe('Cliente - Pessoa Fisica', () => {

  it('create - criar uma pessa fisica', async () => {

    const res1 = await testServer
      .post('/clientes/pessoaFisica')
      .send({
        'nome': 'TESTE 1',
        'tipo': 'fisico',
        'cpf': '16157636785',
        'email': 'TESTE1@TESTE1.com',
        'telefone': '24999318788',
        'endereco': {
          'rua': 'rua da TESTE 1',
          'numero': '400',
          'bairro': 'bairro teste',
          'cidade': 'Angra dos Reis'		
        }
      });

    expect(res1.statusCode).toEqual(StatusCodes.OK);

  });
  
  it('tenta criar com cpf inválido', async () => {

    const res = await testServer
      .post('/clientes/pessoaFisica')
      .send({
        'nome': 'TESTE 1',
        'tipo': 'fisico',
        'cpf': '11111111111',
        'email': 'TESTE1@TESTE1.com',
        'telefone': '24999318788',
        'endereco': {
          'rua': 'rua da TESTE 1',
          'numero': '400',
          'bairro': 'bairro teste',
          'cidade': 'Angra dos Reis'		
        }
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.cpf');

  });

  it('tenta criar com email inválido', async () => {

    const res = await testServer
      .post('/clientes/pessoaFisica')
      .send({
        'nome': 'TESTE 1',
        'tipo': 'fisico',
        'cpf': '16157636785',
        'email': 'TESTE1',
        'telefone': '24999318788',
        'endereco': {
          'rua': 'rua da TESTE 1',
          'numero': '400',
          'bairro': 'bairro teste',
          'cidade': 'Angra dos Reis'		
        }
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');

  });

  it('tenta criar com telefone inválido', async () => {

    const res = await testServer
      .post('/clientes/pessoaFisica')
      .send({
        'nome': 'TESTE 1',
        'tipo': 'fisico',
        'cpf': '16157636785',
        'email': 'TESTE1@gmail.com',
        'telefone': '111',
        'endereco': {
          'rua': 'rua da TESTE 1',
          'numero': '400',
          'bairro': 'bairro teste',
          'cidade': 'Angra dos Reis'		
        }
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.telefone');

  });
 
});