
import { StatusCode } from "../helpers/controllerStatusCode";
import { productSchema } from "../validations/joi/ProductSchema";
import { NextFunction, Request, Response } from "express";
import { deleteObject, getObject } from '../helpers/FileBase';

export const createMiddleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const file = req.file;
    const { error } = productSchema.validate(body);
    // se houver erro na validação do joi então retorna o erro e deleta o arquivo
    
    if (error) {
      if (file) {
        await deleteObject(file.originalname)
      }
      return res.status(400).json({
        message: error.details[0].message
      })
    }
    if (file) {
      if(file.size > 7340032) {
        // se o arquivo for maior que 7mb então deleta o arquivo e retorna um erro
        await deleteObject(file.originalname)
        return res.status(StatusCode.BAD_REQUEST).json({
          message: 'Arquivo muito grande, envie uma imagem menor que 7mb!'
        })
      }
      if (file?.mimetype !== 'image/jpeg' && file?.mimetype !== 'image/png' ) {
        // se não for uma imagem então deleta o arquivo e retorna um erro
        await deleteObject(file.originalname)
        return res.status(StatusCode.BAD_REQUEST).json({
          message: 'Formato de arquivo inválido, envie uma imagem jpeg ou png!'
        })

        
      }
    }
    next();
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Erro interno no servidor"
    })
  }

}