import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../jest.setup';

/*eslint-disable*/

describe('cliente - pessoa juridica', () => {

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

  it('deletar uma pessoa juridica', async () => {

    const res = await testServer
      .post(rotaCreate)
      .send(bodyCreate);

    expect(res.statusCode).toEqual(StatusCodes.OK);

    const resDelete = await testServer
      .delete(`${rotaCreate + res.body.id}`)
      .send();

    expect(resDelete.statusCode).toEqual(StatusCodes.OK);

  });
});