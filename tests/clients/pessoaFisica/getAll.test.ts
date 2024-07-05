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

  it('pegar varias pessoas fisicas', async () => {

    const res = await testServer
      .post(rotaCreate)
      .send(bodyCreate);

    expect(res.statusCode).toEqual(StatusCodes.OK);

    const resGetAll = await testServer
      .get(rotaCreate)
      .send();

    expect(res.statusCode).toEqual(StatusCodes.OK);

  });
});