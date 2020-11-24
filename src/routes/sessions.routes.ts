import { Router } from "express";
import AuthenticateUserService from "./../services/AuthenticateUserService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();
    const { user, token } = await authenticateUserService.execute({ email, password });

    // Com a atualização do TypeScript, Ou seja, o TypeScript alertará sobre o uso de delete em uma propriedade que não é opcional, visto que isso estaria quebrando o contrato da interface
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json({ user: userWithoutPassword, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
