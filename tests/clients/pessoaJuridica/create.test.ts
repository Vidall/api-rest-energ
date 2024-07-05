import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../jest.setup';

/*eslint-disable*/

describe('Cliente - Pessoa juridica', () => {
  const rotaCreate = '/clientes/pessoaJuridica/';
  const bodyCreate = {
    'nome': 'TESTE 1',
    'cnpj': '65.587.278/0001-52',
    'email': 'TESTE1@TESTE1.com',
    'telefone': '24999318788',
    'endereco': {
      'rua': 'rua da TESTE 1',
      'numero': 400,
      'bairro': 'bairro teste',
      'cidade': 'Angra dos Reis'		
    }
  };

  it('create - criar uma pessa juridica', async () => {

    const res1 = await testServer
      .post(rotaCreate)
      .send(bodyCreate);

    expect(res1.statusCode).toEqual(StatusCodes.OK);

  });
  
  it('tenta criar com cpf inválido', async () => {

    const res = await testServer
      .post(rotaCreate)
      .send({bodyCreate, cnpj: '111111'});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.cnpj');

  });

  it('tenta criar com email inválido', async () => {

    const res = await testServer
      .post(rotaCreate)
      .send({bodyCreate, email: 'luan.com'});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');

  });

  it('tenta criar com telefone inválido', async () => {

    const res = await testServer
      .post(rotaCreate)
      .send({bodyCreate, telefone: '1111'});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.telefone');

  });
 
});