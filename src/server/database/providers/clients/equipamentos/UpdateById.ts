import { StatusCodes } from 'http-status-codes';
import { ETableName } from '../../../ETableName';
import { knex } from '../../../knex';
import { IEquipamento, IEquipamentoProps } from '../../../models';

interface IReturn {
  status: number;
  message?: string;
}

export const updateById = async (id: number, equipamentoRecebido: IEquipamentoProps): Promise<IReturn> => {
  try {
    const [resultEquipamento] = await knex(ETableName.equipamento)
      .select('*')
      .where('id', id);

    if (!resultEquipamento) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: 'Registro não localizado',
      };
    }

    const equipamentoBancoObject = JSON.parse(resultEquipamento.equipamento as string) as IEquipamento;

    // Valores existentes no banco de dados
    const horimetroAtualBanco = resultEquipamento.horimetro_atual ?? 0;
    const kwhAtualBanco = resultEquipamento.KWH_atual ?? 0;

    // Valores recebidos
    const horimetroAtualRecebido = equipamentoRecebido.horimetro_atual;
    const kwhAtualRecebido = equipamentoRecebido.KWH_atual;

    // Atualizando valores antigos e atuais
    const horimetroAntigo = horimetroAtualRecebido && horimetroAtualRecebido !== horimetroAtualBanco ? horimetroAtualBanco : equipamentoBancoObject.horimetro ?? 0;
    const kwhAntigo = kwhAtualRecebido && kwhAtualRecebido !== kwhAtualBanco ? kwhAtualBanco : equipamentoBancoObject.KWH ?? 0;

    if (horimetroAtualRecebido) {
      if (horimetroAtualRecebido <= horimetroAtualBanco || horimetroAtualRecebido <= equipamentoBancoObject.horimetro!) {      
        return {
          status: StatusCodes.BAD_REQUEST,
          message: `O valor do horimetro não pode ser menor ou igual a ${horimetroAtualBanco === 0 ? equipamentoBancoObject.horimetro :  horimetroAtualBanco}`,
        };
      }
    }

    if (kwhAtualRecebido) {
      if (kwhAtualRecebido <= kwhAtualBanco || kwhAtualRecebido <= equipamentoBancoObject.KWH!) {      
        return {
          status: StatusCodes.BAD_REQUEST,
          message: `O valor do kwh não pode ser menor ou igual a ${kwhAtualBanco === 0 ? equipamentoBancoObject.KWH :  kwhAtualBanco}`,
        };
      }
    }

    const {equipamento, ...equipamentoParcial}: IEquipamentoProps = resultEquipamento;
    // Atualizando o objeto `equipamento`
    const equipamentoAtualizado = {
      ...equipamentoParcial, // Convertido para JSON antes de salvar no banco
      horimetro_atual: horimetroAtualRecebido || horimetroAtualBanco,
      KWH_atual: kwhAtualRecebido || kwhAtualBanco,
    };

    // Atualização no banco de dados
    const result = await knex(ETableName.equipamento)
      .update({...equipamentoAtualizado, equipamento: JSON.stringify({
        ...equipamentoBancoObject,
        horimetro: horimetroAntigo === 0 ? equipamentoBancoObject.horimetro : horimetroAntigo,
        KWH: kwhAntigo === 0 ? equipamentoBancoObject.KWH : kwhAntigo,
      }) as IEquipamento})
      .where('id', id);

    if (!result) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: 'Registro não localizado',
      };
    }

    return {
      status: StatusCodes.OK,
      message: 'Registro atualizado com sucesso',
    };
  } catch (error) {
    console.error(error);

    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Não foi possível atualizar o registro',
    };
  }
};
