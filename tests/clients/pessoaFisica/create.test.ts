import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../jest.setup';

/*eslint-disable*/

describe('Cliente - Pessoa Fisica', () => {

  const rotaCreate = '/clientes/pessoaFisica/';
  const bodyCreate = {
    'nome': 'TESTE 1',
    'cpf': '16157636785',
    'email': 'TESTE1@TESTE1.com',
    'telefone': '24999318788',
    'endereco': {
      'rua': 'rua da TESTE 1',
      'numero': 400,
      'bairro': 'bairro teste',
      'cidade': 'Angra dos Reis'		
    }
  };

  it('create - criar uma pessa fisica', async () => {

    const res1 = await testServer
      .post(rotaCreate)
      .send(bodyCreate);

    expect(res1.statusCode).toEqual(StatusCodes.OK);

  });
  
  it('tenta criar com cpf inválido', async () => {

    const res = await testServer
      .post(rotaCreate)
      .send({...bodyCreate, cpf: '11111111111'});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.cpf');

  });

  it('tenta criar com email inválido', async () => {

    const res = await testServer
      .post(rotaCreate)
      .send({...bodyCreate, email: 'luan.com'});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');

  });

  it('tenta criar com telefone inválido', async () => {

    const res = await testServer
      .post(rotaCreate)
      .send({...bodyCreate, telefone: '111111111'});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.telefone');

  });
 
});