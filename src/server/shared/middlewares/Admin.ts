import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

/*eslint-disable-next-line*/
export const admin = (middleware: (req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Verifique se o cabeçalho 'admin' existe e é 'true'
    if (req.headers.admin && Number(req.headers.admin) === 1) {
      middleware(req, res, next);
    } else {
      console.log(req.headers);
      res.status(StatusCodes.UNAUTHORIZED).json({
        errors: {
          default: 'Usuário não é administrador'
        }
        ,
      });
    }
  };
};
