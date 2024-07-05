import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../jest.setup';

/*eslint-disable*/

describe('UpdateById', () => {

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

  it('Atualizar uma pessoa fisica', async () => {

    const res1 = await testServer
      .post('/clientes/pessoaFisica')
      .send({...bodyCreate});

    expect(res1.statusCode).toEqual(StatusCodes.OK);

    const resEdit = await testServer
      .put(`/clientes/pessoaFisica/${res1.body.id}`)
      .send({...bodyCreate});

    expect(resEdit.statusCode).toEqual(StatusCodes.OK);
  });

  it('Tenta passar parametros indevido no body', async () => {

    const res1 = await testServer
      .post('/clientes/pessoaFisica')
      .send({...bodyCreate});

    expect(res1.statusCode).toEqual(StatusCodes.OK);

    const resEdit = await testServer
      .put(`/clientes/pessoaFisica/${res1.body.id}`)
      .send({...bodyCreate, 'paramtest': 'valor'});

    expect(resEdit.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resEdit.body).toHaveProperty('errors.body');
  });

  it('tenta cadastrar email inválido', async () => {

    const res1 = await testServer
      .post('/clientes/pessoaFisica')
      .send({...bodyCreate});

    expect(res1.statusCode).toEqual(StatusCodes.OK);

    const resEdit = await testServer
      .put(`/clientes/pessoaFisica/${res1.body.id}`)
      .send({...bodyCreate, telefone: '111111'});

    expect(resEdit.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resEdit.body).toHaveProperty('errors.body.telefone');
  });

  it('tenta cadastrar numero inválido', async () => {

    const res1 = await testServer
      .post('/clientes/pessoaFisica')
      .send({...bodyCreate});

    expect(res1.statusCode).toEqual(StatusCodes.OK);

    const resEdit = await testServer
      .put(`/clientes/pessoaFisica/${res1.body.id}`)
      .send({...bodyCreate, email: 'teste.com'});

    expect(resEdit.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resEdit.body).toHaveProperty('errors.body.email');
  });

  it('tenta passar o tipo juridico', async () => {

    const res1 = await testServer
      .post('/clientes/pessoaFisica')
      .send({...bodyCreate});

    expect(res1.statusCode).toEqual(StatusCodes.OK);

    const resEdit = await testServer
      .put(`/clientes/pessoaFisica/${res1.body.id}`)
      .send({...bodyCreate, tipo: 'juridico'});

    expect(resEdit.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resEdit.body).toHaveProperty('errors.body.tipo');
  });
  
});