import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export type AuthRequest = Request & {
  user?: {
    userId: string;
    rol: string;
  };
};

export const authRequired = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      message: "Token no enviado.",
    });
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({
      ok: false,
      message: "Formato de token inválido.",
    });
  }

  try {
    const payload = verifyToken(token);

    req.user = {
      userId: payload.userId,
      rol: payload.rol,
    };

    next();
  } catch {
    return res.status(401).json({
      ok: false,
      message: "Token inválido o expirado.",
    });
  }
};

export const roleRequired = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado.",
      });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        ok: false,
        message: "No tienes permisos para acceder a este recurso.",
      });
    }

    next();
  };
};