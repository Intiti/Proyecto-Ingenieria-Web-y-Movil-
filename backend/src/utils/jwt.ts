import jwt from "jsonwebtoken";

type TokenPayload = {
  userId: string;
  rol: string;
};

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET no está definido en el archivo .env");
  }

  return secret;
};

export const generateToken = (payload: TokenPayload) => {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: "2h",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, getJwtSecret()) as TokenPayload;
};