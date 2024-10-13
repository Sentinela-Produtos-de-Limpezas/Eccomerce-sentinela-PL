import { Request, Response } from 'express';
import { StatusCode } from '../helpers/controllerStatusCode';
import { AddressServices } from '../service/Address.service';
import { BaseError } from '../helpers/BaseError';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const addresses = await AddressServices.getAll();
    if (addresses instanceof BaseError) {
      return res.status(addresses.statusCode).json({ message: addresses.message });
    }
    return res.status(StatusCode.OK).json(addresses);
  } catch (error: any) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getByUserId = async (req: Request, res: Response) => {
  try {
    const userId = +req.params.userId;
    const addresses = await AddressServices.getByUserId(userId);
    if (addresses instanceof BaseError) {
      return res.status(addresses.statusCode).json({ message: addresses.message });
    }
    return res.status(StatusCode.OK).json(addresses);
  } catch (error: any) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const address = await AddressServices.getOne(+req.params.id);
    if (address instanceof BaseError) {
      return res.status(address.statusCode).json({ message: address.message });
    }
    return res.status(StatusCode.OK).json(address);
  } catch (error: any) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const addressData = req.body;
    const address = await AddressServices.create(addressData);
    if (address instanceof BaseError) {
      return res.status(address.statusCode).json({ message: address.message });
    }
    return res.status(StatusCode.CREATED).json(address);
  } catch (error: any) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const addressData = req.body;
    const address = await AddressServices.update(id, addressData);
    if (address instanceof BaseError) {
      return res.status(address.statusCode).json({ message: address.message });
    }
    return res.status(StatusCode.OK).json(address);
  } catch (error: any) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const result = await AddressServices.remove(id);
    if (result instanceof BaseError) {
      return res.status(result.statusCode).json({ message: result.message });
    }
    return res.status(StatusCode.OK).json(result);
  } catch (error: any) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
