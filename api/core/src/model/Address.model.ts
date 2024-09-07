import { Address as PrismaAddress } from '@prisma/client';
import { Either, left, right } from '@sweet-monads/either';
import { BaseError } from '../helpers/BaseError';
import { StatusCode } from '../helpers/controllerStatusCode';
import prisma from './prisma';
import { AddressUpdate, AddressInput } from '../types/address/address';

export const Address = {
  async getAll(): Promise<Either<BaseError, PrismaAddress[]>> {
    try {
      const addresses = await prisma.address.findMany();
      return right(addresses);
    } catch (error: any) {
      return left(new BaseError("Ocorreu um erro inesperado!"));
    }
  },

  async getByUserId(userId: number): Promise<Either<BaseError, PrismaAddress[]>> {
    try {
      const addresses = await prisma.address.findMany({
        where: { UserId: userId },
      });
      return right(addresses);
    } catch (error: any) {
      return left(new BaseError("Ocorreu um erro inesperado!"));
    }
  },

  async getOne(id: number): Promise<Either<BaseError, PrismaAddress | null>> {
    try {
      const address = await prisma.address.findUnique({
        where: { id },
      });
      return right(address);
    } catch (error: any) {
      return left(new BaseError("Ocorreu um erro inesperado!"));
    }
  },

  async create(addressData: AddressInput): Promise<Either<BaseError, PrismaAddress>> {
    try {
      const newAddress = await prisma.address.create({ data: addressData });
      return right(newAddress);
    } catch (error: any) {
      return left(new BaseError("Ocorreu um erro inesperado!"));
    }
  },

  async update(id: number, addressData: AddressUpdate): Promise<Either<BaseError, PrismaAddress>> {
    try {
      const updatedAddress = await prisma.address.update({
        where: { id },
        data: addressData,
      });
      return right(updatedAddress);
    } catch (error: any) {
      if (error.code === 'P2025') {
        return left(new BaseError("Endereço não encontrado!", StatusCode.NOT_FOUND));
      }
      return left(new BaseError("Não foi possível atualizar o endereço!", StatusCode.BAD_REQUEST));
    }
  },

  async delete(id: number): Promise<Either<BaseError, boolean>> {
    try {
      await prisma.address.delete({
        where: { id },
      });
      return right(true);
    } catch (error: any) {
      if (error.code === 'P2025') {
        return left(new BaseError("Endereço não encontrado!", StatusCode.NOT_FOUND));
      }
      return left(new BaseError("Não foi possível deletar o endereço!", StatusCode.BAD_REQUEST));
    }
  },
};
