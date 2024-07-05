import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../jest.setup';

/*eslint-disable*/

describe('cliente - pessoa fisica', () => {

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

  it('pegar uma pessoa fisica pelo id', async () => {

    const res = await testServer
      .post(rotaCreate)
      .send(bodyCreate);

    expect(res.statusCode).toEqual(StatusCodes.OK);

    const resGetByid = await testServer
      .get(`${rotaCreate + res.body.id}`)
      .send();

    expect(resGetByid.statusCode).toEqual(StatusCodes.OK);
  });

  it('tenta passar id que não existe', async () => {

    const res = await testServer
      .post(rotaCreate)
      .send({...bodyCreate});

    expect(res.statusCode).toEqual(StatusCodes.OK);

    const resGetByid = await testServer
      .get(`${rotaCreate + 9999}`)
      .send();

    expect(resGetByid.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it('tenta passar id 0', async () => {

    const res = await testServer
      .post(rotaCreate)
      .send({...bodyCreate});

    expect(res.statusCode).toEqual(StatusCodes.OK);

    const resGetByid = await testServer
      .get(`${rotaCreate + 0}`)
      .send();

    expect(resGetByid.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resGetByid.body).toHaveProperty('errors.params.id');
  });

  it('tenta passar id não inteiro', async () => {

    const res = await testServer
      .post(rotaCreate)
      .send({...bodyCreate});

    expect(res.statusCode).toEqual(StatusCodes.OK);

    const resGetByid = await testServer
      .get(`${rotaCreate + 1.5}`)
      .send();

    expect(resGetByid.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resGetByid.body).toHaveProperty('errors.params.id');
  });

});