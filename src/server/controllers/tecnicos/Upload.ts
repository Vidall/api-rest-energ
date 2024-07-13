import { RequestHandler } from 'express';

/*eslint-disable no-undef*/

interface S3File extends Express.Multer.File {
  location: string;
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  contentDisposition: string | null;
  contentEncoding: string | null;
  storageClass: string;
  serverSideEncryption: string | null;
  etag: string;
}

interface S3UploadResponse {
  message: string;
  dados: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    bucket: string;
    key: string;
    acl: string;
    contentType: string;
    contentDisposition: string | null;
    contentEncoding: string | null;
    storageClass: string;
    serverSideEncryption: string | null;
    location: string;
    etag: string;
  };
}

export const upload: RequestHandler = (req, res, next) => {
  const file = req.file as S3File;

  if (!file) {
    return res.status(400).json({ message: 'Não há aquivo para fazer o upload' });
  }
  const response: S3UploadResponse = {
    message: 'Enviado com sucesso',
    dados: {
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      size: file.size,
      bucket: file.bucket,
      key: file.key,
      acl: file.acl,
      contentType: file.contentType,
      contentDisposition: file.contentDisposition,
      contentEncoding: file.contentEncoding,
      storageClass: file.storageClass,
      serverSideEncryption: file.serverSideEncryption,
      location: file.location,
      etag: file.etag,
    },
  };

  const pathAssinatura = response.dados.location;

  next(pathAssinatura);

};