import {hash, genSalt, compare} from 'bcryptjs';

const SALT_RANDOMS = 8;

const hashPassWord = async (password: string) => {
  const genGenerated = await genSalt(SALT_RANDOMS);

  return await hash(password, genGenerated);

};

const verifyPassWord = (passWord: string, hashedPassWord: string) => {
  return compare(passWord, hashedPassWord);
};

export const passWordCrypto = {
  hashPassWord,
  verifyPassWord
};