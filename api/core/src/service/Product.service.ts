import { Product } from '../model/Product.model';
import { BaseError } from '../helpers/BaseError';
import { StatusCode } from '../helpers/controllerStatusCode';
import { productInput, productUpdate } from '../types/products/product';
import { getObject } from '../helpers/FileBase';

export const ProductServices = {
  async getAll() {
    try {
      const products = await Product.get()
      if (products.isLeft()) return new BaseError(products.value.message, products.value.statusCode)
      if (products.isRight()) return products.value
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  },
  async getAllByCategory(category_name: string) {
    try {
  
      const products = await Product.getByCategory(category_name)
      if (products.isLeft()) return new BaseError(products.value.message, products.value.statusCode)
      if (products.isRight()) return products.value
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  },
  async getOne(id: number) {
    try {
      const product = await Product.getOne(id)
      if (product.isRight()) {
        if (product.value === null) return new BaseError("Produto não encontrado !", StatusCode.NOT_FOUND)

        return product.value
      }
      if (product.isLeft()) return new BaseError(product.value.message, StatusCode.INTERNAL_SERVER_ERROR)
    } catch (error) {
      return error
    }
  },
  async create(productDate: productInput, nameFile: string) {
    try {
      const existProduct = await Product.findValidationCreateProduct({
        name: productDate.name,
        sku: productDate.sku
      
      })

      const fileUrl = await getObject(nameFile)

      if (existProduct.isRight()) {

        const CreatedProduct = await Product.create({
          ...productDate,
          price: +productDate.price,
          image: fileUrl as string
        })
        if (CreatedProduct.isLeft()) {
          return new BaseError(CreatedProduct.value.message, CreatedProduct.value.statusCode)
        }
        if (CreatedProduct.isRight()) return CreatedProduct.value
      }
      if (existProduct.isLeft() && !existProduct.value) return new BaseError("Produto já cadastrado!", StatusCode.BAD_REQUEST)


    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  },
  async update(id: number, productDate: productUpdate) {
    try {
      const existProductId = await Product.getOne(id)
      if (existProductId.isLeft()) return new BaseError(existProductId.value.message, existProductId.value.statusCode)
        if (existProductId.isRight()) {
          if (existProductId.value === null) return new BaseError("Produto não encontrado !", StatusCode.NOT_FOUND)
          }
        
        const existProduct = await Product.findValidationCreateProduct({
          name: productDate.name || "",
          sku: productDate.sku || ""
        })
        if (existProduct.isRight()) {
          const product = await Product.getOne(id)
          if (product.isLeft()) return new BaseError(product.value.message, product.value.statusCode)
          if (product.isRight()) {
            if (product.value === null) return new BaseError("Produto não encontrado !", StatusCode.NOT_FOUND)
          }
        }
        const productUpdate = await Product.update(id, {
          ...productDate,
          price: productDate.price ? +productDate.price : undefined
        
        })
        if (productUpdate.isLeft()) return new BaseError(productUpdate.value.message, productUpdate.value.statusCode)
        if (productUpdate.isRight()) return productUpdate.value
      } catch (error) {
        return error
    }
  },

  //falta fazer o update e o remove
  // o update da imagem é diferente da atualização do produto

  async remove(id: number) {
    try {
      const product = await Product.delete(id)
      if (product.isLeft()) return new BaseError(product.value.message, product.value.statusCode)
      if (product.isRight()) {
        return product.value
      }
    } catch (error) {
      return error
    }
  },
}