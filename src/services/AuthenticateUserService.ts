import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import authConfig from "../config/auth";

import User from "./../models/User";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) throw new Error("Incorrect email/password combination");

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) throw new Error("Incorrect email/password combination");

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    }); //o 2o. parâmetro é uma chave secreta, pode ser qq coisa, no caso gerei um md5 hash qq
    return { user, token };
  }
}
