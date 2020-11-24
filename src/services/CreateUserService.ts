import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import User from "./../models/User";

interface Request {
  name: string;
  email: string;
  password: string;
}
export default class CreateUserService {
  /*
    Como não tenho nehum método especial, não preciso criar um repositório para Users.
    Basta usar o getRepository para poder ter acesso aos métodos de acesso à dados q já vem com ele
    */
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkIfUserExists = await usersRepository.findOne({
      where: { email: email },
    });

    if (checkIfUserExists) throw new Error("Email address already taken by another user!");

    const hashedPassword = await hash(password, 8); //8 é um nuero aleatório q colocou para o salt
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}
