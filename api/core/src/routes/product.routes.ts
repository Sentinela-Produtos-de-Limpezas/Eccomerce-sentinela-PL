import multer from 'multer';
import multerS3 from 'multer-s3';
import { Router } from 'express';
import { S3 } from '../helpers/FileBase';
import { getAll, getOne, create, remove, update, getAllByCategory } from "../controller/Product.controller";
import { createMiddleProduct } from '../middleware/createMiddleProduct';
import { authMiddleware } from '../middleware/authMiddle';


const upload = multer({
  storage: multerS3({
    s3: S3,
    bucket: process.env.FILE_STORAGE_BUCKET_NAME as string,
    metadata: (_req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (_req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
})

const productRouter = Router();

productRouter.get('/', authMiddleware, getAll);
productRouter.get('/category', authMiddleware, getAllByCategory);
productRouter.get('/:id', getOne);
productRouter.post('/', authMiddleware, upload.single('file'), createMiddleProduct, create);
productRouter.put('/:id', authMiddleware, update);
productRouter.delete('/:id', authMiddleware, remove);

export default productRouter;