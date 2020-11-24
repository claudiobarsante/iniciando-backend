import { Router } from "express";
import { parseISO } from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "./../services/CreateAppointmentService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import { getCustomRepository } from "typeorm";

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated); //vai aplicar o middleware em todas as rotas

//Como estou usando o typeorm não preciso mais instanciar o repository então
//usar o getCustomRepository
//const appointmentRepository = new AppointmentsRepository();

appointmentsRouter.get("/", async (request, response) => {
  console.log(request.user);
  const appointmentRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentRepository.find(); //o find trás todos os registros
  return response.json(appointments);
});

//http://localhost:3333/appointments = isso equivale a rota abaixo, pq lá no index.ts de clarei  routes.use('/appointments',appointmentsRouter)
//então só precisa pegar o q vier depois do appointments
appointmentsRouter.post("/", async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({ date: parsedDate, provider_id });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
