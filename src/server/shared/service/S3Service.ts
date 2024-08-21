import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

/*eslint-disable*/

export const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID || '',
    secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
  },
});

// Transformar o nome do arquivo para randomico
const getRandomImageName = (bytes = 32): string => crypto.randomBytes(bytes).toString('hex');

export const randomImageName = `${getRandomImageName()}_${Date.now()}`;
