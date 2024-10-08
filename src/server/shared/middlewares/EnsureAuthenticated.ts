import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWTService } from '../service/JWTService';

export const ensureAuthenticated: RequestHandler = (req, res, next) => {
  const {authorization} = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Não autorizado'
      }
    });
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Não autorizado'
      }
    });
  }

  const jwtData = JWTService.verify(token);

  if (jwtData === 'JWT_SECRET_NOT_FOUND'){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Erro ao verificar o token'
      }
    });
  } else if (jwtData === 'INVALID_TOKEN') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Não autorizado'
      }
    });
  }

  req.headers.IdUsuario = jwtData.Uid?.toString();
  req.headers.admin = jwtData.admin?.toString();

  return next();

}; 