import { Product } from '../model/Product.model';

export const ProductServices = {
  async getAll() {
    try {
      return await Product.get()
    } catch (error) {
      return error
    }
  },
  async getOne(id: number) {
    try {
      return await Product.getOne(id)
    } catch (error) {
      return error
    }
  },
  async create(productDate: any) {
    try {
      return await Product.create(productDate)
    } catch (error) {
      return error
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
  }
}