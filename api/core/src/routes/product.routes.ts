import multer from 'multer';
import multerS3 from 'multer-s3';
import { Router } from 'express';
import { S3 } from '../helpers/FileBase';
import { getAll, getOne, create, remove, update } from "../controller/Product.controller";
import { createMiddleProduct } from '../middleware/createMiddleProduct';


// ja envia o arquivo para o bucket atraves do multer
const upload = multer({
  storage: multerS3({
    s3: S3,
    bucket: process.env.AWS_SECRET_BUCKET_NAME as string,
    metadata: (_req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (_req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
})

const productRouter = Router();

productRouter.get('/', getAll);
productRouter.get('/:id', getOne);
productRouter.post('/', upload.single('file'),createMiddleProduct, create);
productRouter.put('/:id', update);
productRouter.delete('/:id', remove);

export default productRouter;