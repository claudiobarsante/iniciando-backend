import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  //Validação do Token
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new Error("JWT token is missing");

  //Formato recebido
  //Bearer token
  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload; //usando o 'as' estamos forçando a formatação p tipo TokenPayload

    //aqui estou colocando dentro do Request a propriedade 'user'q vai
    //ficar disponível para todos os outros requests a partir de agora
    request.user = {
      id: sub,
    };
    return next();
  } catch (err) {
    throw new Error("Invalid JWT token !");
  }
}
