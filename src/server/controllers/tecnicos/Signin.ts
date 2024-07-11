import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';
import { Request, Response } from 'express';
import { tecnicosProviders } from '../../database/providers/tecnicos';
import { passWordCrypto } from '../../shared/service';
import { StatusCodes } from 'http-status-codes';
import { JWTService } from '../../shared/service/JWTService';
import { ITecnico } from '../../database/models/tecnicos/Tecnico';

interface IBodyProps extends Omit<ITecnico, 'id' | 'nome' | 'telefone' | 'cpf' | 'admin' | 'pathAssinatura'> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    senha: yup.string().required().min(6)
  })),
}));

export const signIn = async (req: Request, res: Response) => {
  const {email, senha} = req.body;

  const tecnico = await tecnicosProviders.getByEmail(email);

  // Verificar se vai lançae uma isntancia de erro
  if (tecnico instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Usuário ou senha inválidos'
      }
    });
  }

  // Verificar se a senha bate
  const passWordMatch = await passWordCrypto.verifyPassWord(senha, tecnico.senha!);
  
  if (!passWordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Usuário ou senha inválidos'
      }
    });
  }else {
    const accessToken = JWTService.sigin({Uid: tecnico.id, admin: tecnico.admin});

    if (accessToken === 'JWT_SECRET_NOT_FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Erro ao gerar o token de acesso'
        }
      });
    }

    return res.status(StatusCodes.OK).json({
      accessToken
    });
  }
};