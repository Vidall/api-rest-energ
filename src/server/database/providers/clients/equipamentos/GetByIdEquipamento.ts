import { StatusCodes } from 'http-status-codes';
import { IEquipamento } from '../../../models';
import { knex } from '../../../knex';
import { ETableName } from '../../../ETableName';

interface IResult {
  status: StatusCodes
  message: string,
  data?: IEquipamento
}

export const getByIdEquipamento = async (id: number): Promise<IResult> => {
  const result = await knex(ETableName.equipamento)
    .select('*')
    .where('id', Number(id));

  if (!result || result.length === 0) {
    return {
      status: StatusCodes.NOT_FOUND,
      message: 'Pessoa fisica não localizada'
    };
  };
  const finalResult = result.map(item => {
    const res = {
      ...item,
      equipamento: JSON.parse(item.equipamento as unknown as string)
    } as IEquipamento;

    return res;
  });

  return {
    status: StatusCodes.OK,
    message: 'Pessoa Fisica encontrada',
    data: finalResult[0]
  };
};

