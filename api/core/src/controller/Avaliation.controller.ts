import { StatusCode } from '../helpers/controllerStatusCode';
import { BaseError } from '../helpers/BaseError';
import { AvaliationService } from '../service/Avaliation.service';
import { Request, Response } from 'express';

export const create = async (req: Request, res: Response) => {
  try {
    const avaliationBody = req.body
    const avaliation = await AvaliationService.create(avaliationBody)
    if (avaliation instanceof BaseError) {
      return res.status(avaliation.statusCode).json({ message: avaliation.message })
    }
    return res.status(StatusCode.CREATED).json(avaliation)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}
