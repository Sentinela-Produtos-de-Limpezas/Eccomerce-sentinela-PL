import { Address } from '../model/Address.model';
import { BaseError } from '../helpers/BaseError';
import { StatusCode } from '../helpers/controllerStatusCode';
import { AddressInput, AddressUpdate } from '@/types/address/address';

export const AddressServices = {
  async getAll() {
    try {
      const addresses = await Address.getAll();
      if (addresses.isLeft()) {
        return new BaseError(addresses.value.message, addresses.value.statusCode);
      }
      return addresses.value;
    } catch (error) {
      return new BaseError("Ocorreu um erro inesperado!", StatusCode.INTERNAL_SERVER_ERROR);
    }
  },

  async getByUserId(userId: number) {
    try {
      const addresses = await Address.getByUserId(userId);
      if (addresses.isLeft()) {
        return new BaseError(addresses.value.message, addresses.value.statusCode);
      }
      return addresses.value;
    } catch (error) {
      return new BaseError("Ocorreu um erro inesperado!", StatusCode.INTERNAL_SERVER_ERROR);
    }
  },

  async getOne(id: number) {
    try {
      const address = await Address.getOne(id);
      if (address.isLeft()) {
        return new BaseError(address.value.message, address.value.statusCode);
      }
      return address.value;
    } catch (error) {
      return new BaseError("Ocorreu um erro inesperado!", StatusCode.INTERNAL_SERVER_ERROR);
    }
  },

  async create(addressData:AddressInput ) {
    try {
      const address = await Address.create(addressData);
      if (address.isLeft()) {
        return new BaseError(address.value.message, address.value.statusCode);
      }
      return address.value;
    } catch (error) {
      return new BaseError("Ocorreu um erro inesperado!", StatusCode.INTERNAL_SERVER_ERROR);
    }
  },

  async update(id: number, addressData: AddressUpdate) {
    try {
      const address = await Address.update(id, addressData);
      if (address.isLeft()) {
        return new BaseError(address.value.message, address.value.statusCode);
      }
      return address.value;
    } catch (error) {
      return new BaseError("Ocorreu um erro inesperado!", StatusCode.INTERNAL_SERVER_ERROR);
    }
  },

  async remove(id: number) {
    try {
      const result = await Address.delete(id);
      if (result.isLeft()) {
        return new BaseError(result.value.message, result.value.statusCode);
      }
      return { message: "Endereço deletado com sucesso!" };
    } catch (error) {
      return new BaseError("Ocorreu um erro inesperado!", StatusCode.INTERNAL_SERVER_ERROR);
    }
  },
};
