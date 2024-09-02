import { Request, Response } from "express";
import { StatusCode } from '../helpers/controllerStatusCode';
import { UserService } from "../service/Users.service";
import { BaseError } from "../helpers/BaseError";
import { decodeToken, generateToken, verifyRefreshToken } from '../helpers/JsonWebToken';
import { Redis } from "@upstash/redis";
import { userOutput } from "@/types/user/user";


const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAll()
    if (users instanceof BaseError) {
      return res.status(users.statusCode).json({ message: users.message })
    }
    return res.status(StatusCode.OK).json(users)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}

const getOne = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getOne(+req.params.id)
    if (user instanceof BaseError) {
      return res.status(user.statusCode).json({ message: user.message })
    } res.status(StatusCode.OK).json(user)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}


const create = async (req: Request, res: Response) => {
  try {
    const user = await UserService.create(req.body)
    if (user instanceof BaseError) {
      return res.status(user.statusCode).json({ message: user.message })
    }

    const verified_Account = await UserService.login(req.body.email, req.body.password)
    if (verified_Account instanceof BaseError) {
      return res.status(verified_Account.statusCode).json({ message: verified_Account.message })
    }
    return res.json({
      token: verified_Account?.token
    }).json(user)
  } catch (error: any) {

    res.status(error.StatusCode).json({
      message: error.message,
    })
  }
}

const createWithAddress = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createWithAddress(req.body)

    if (user instanceof BaseError) {
      return res.status(user.statusCode).json({ message: user.message })
    }

    const verified_Account = await UserService.login(req.body.email, req.body.password)
    if (verified_Account instanceof BaseError) {
      return res.status(verified_Account.statusCode).json({ message: verified_Account.message })
    }
    return res.status(StatusCode.CREATED).json(verified_Account)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const user = await UserService.update(+req.params.id, req.body)
    if (user instanceof BaseError) {
      return res.status(user.statusCode).json({ message: user.message })
    }
    return res.status(StatusCode.OK).json(user)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    const user = await UserService.remove(+req.params.id)
    if (user instanceof BaseError) {
      return res.status(user.statusCode).json({ message: user.message })
    }
    return res.status(StatusCode.OK).json(user)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const user = await UserService.login(req.body.email, req.body.password)
    if (user instanceof BaseError) {
      return res.status(user.statusCode).json({ message: user.message })
    }
    return res.json({
      token: user?.token,
      user: user?.user,
      session_id: user?.session_id
    }).status(StatusCode.CREATED)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}

const redis = new Redis({
  url: process.env.REDIS_URL as string,
  token: process.env.REDIS_TOKEN,
});

const refreshToken = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.body; // Obtém o UUID do corpo da requisição

    if (!uuid) {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: "UUID é Requerido!",
      });
    }

    // Obtém o refreshToken associado ao UUID
    const refreshToken = await redis.get(uuid);

    if (!refreshToken) {
      return res.status(StatusCode.UNAUTHORIZED).json({
        message: "UUID inválido ou expirado",
      });
    }

    // Verifica a validade do refreshToken
    try {
      const isValid = verifyRefreshToken(refreshToken as string);

      if (!isValid) {
        await redis.del(uuid);
        return res.status(StatusCode.UNAUTHORIZED).json({
          message: "refreshToken expirado!",
        });
      }

      // Decodifica o token para obter informações do usuário
      const user = decodeToken(refreshToken as string) as userOutput;
      const newAccessToken = generateToken({
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        phone: user.phone
      });

      return res.json({
        access_token: newAccessToken,
        user: user,
      });

    } catch (error) {
      await redis.del(uuid);
      return res.status(StatusCode.UNAUTHORIZED).json({
        message: "refreshToken inválido!",
      });
    }
  } catch (error: any) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};


export {
  getAll,
  getOne,
  create,
  update,
  remove,
  login,
  refreshToken,
  createWithAddress
}