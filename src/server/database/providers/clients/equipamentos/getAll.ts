import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { IEquipamento, IEquipamentoProps } from '../../../models';

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IEquipamentoProps[] | Error> => {
  try {

    const result = await knex(ETableName.equipamento)
      .select('*')
      .offset((page - 1 ) * limit)
      .limit(limit);

    /*Verificação para ver se possui o id junto nas query,
    se tiver o id retorna a pessoa fisica junto com as demais*/
    if (id > 0 && result.every(item => item.id !== id) ) {
      const resultById = await knex(ETableName.equipamento)
        .select('*')
        .where('id', id)
        .first();

      /*Realizar o parse dos escolhidos no limit e no id*/
      if (resultById) {
        return [
          ...result.map(item => ({
            ...item,
            equipamento: JSON.parse(item.equipamento as unknown as string) as IEquipamento,
          })),
          {
            ...resultById,
            equipamento: JSON.parse(resultById.equipamento as unknown as string) as IEquipamento
          },
        ] as IEquipamentoProps[];
      }
    }

    // converter os endereco para JSON Stringfy
    const finalResult = result.map(item => ({
      ...item,
      equipamento: JSON.parse(item.equipamento as unknown as string)
    })) as IEquipamentoProps[];

    return finalResult;
  }    
  catch (error) {
    console.log(error);
    return new Error('Erro ao consultar clientes');
  }

};