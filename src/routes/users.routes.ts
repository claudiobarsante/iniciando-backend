import { Router } from "express";
import multer from "multer";
import CreateUserService from "./../services/CreateUserService";
import ensureAuthenticated from "./../middlewares/ensureAuthenticated";
import uploadConfig from "../config/upload";

const usersRouter = Router();
const upload = multer(uploadConfig); //passando p o multer as configurações de upload

usersRouter.post("/", async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });

    // Com a atualização do TypeScript, Ou seja, o TypeScript alertará sobre o uso de delete em uma propriedade que não é opcional, visto que isso estaria quebrando o contrato da interface
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
//não tem como um usuário adicionar um avatar se ele não estiver logado, então
//colocamos o middleware- ensureAuthenticated para fazer essa verificação
//adicionando o 'upload' como middleware e sinalizando q 'avatar'vai ser o campo com o arquivo
usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    console.log(request.file);
    return response.json({ ok: true });
  }
);

export default usersRouter;
