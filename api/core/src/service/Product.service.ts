import { Product } from '../model/Product.model';
import { BaseError } from '../helpers/BaseError';
import { StatusCode } from '../helpers/controllerStatusCode';
import { productInput } from '../types/products/product';
import { getObject } from '../helpers/FileBase';
// import {} from ""

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
      const existProduct = await Product.findValidationCreateProduct(productDate.name)

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
  async update(id: number, productDate: any) {
    try {
      return await Product.update(id, productDate)
    } catch (error) {
      return error
    }
  },

  async remove(id: number) {
    try {
      return await Product.delete(id)
    } catch (error) {
      return error
    }
  },
}