import * as jwt from 'jsonwebtoken';

interface IJwt {
  Uid?: number,
  admin: boolean
}

const sigin = (data: IJwt) => {
  /*eslint-disable-next-line*/
  if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';
  /*eslint-disable-next-line*/
  return jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '24h'});
};

export const verify = (token: string): IJwt | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' => {
  /*eslint-disable-next-line*/
  if(!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

  try {
    /*eslint-disable-next-line*/
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === 'string') return 'INVALID_TOKEN';

    return decoded as IJwt;

  } catch (error) {
    return 'INVALID_TOKEN';
  }
};

export const JWTService = {
  sigin,
  verify
};

