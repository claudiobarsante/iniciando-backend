import Appointment from "./../models/Appointment";
import { startOfHour } from "date-fns";
import AppointmentsRepository from "./../repositories/AppointmentsRepository";
import { getCustomRepository } from "typeorm";

interface RequestDTO {
  provider_id: string;
  date: Date;
}

//Dentro do service ficam as regras de negócio
//Todo service só tem um método, aqui no caso ; execute

//SOLID - dependecy inversion
export default class CreateAppointmentService {
  /* private _appointmentRepository: AppointmentsRepository;

  constructor(appointmentRepository: AppointmentsRepository) {
    this._appointmentRepository = appointmentRepository;
  }*/
  //com o typeorm não precisa mais passar o repository, então usar dentro do método execute:
  //const appointmentRepository = getCustomRepository(AppointmentsRepository);

  public async execute({ date, provider_id }: RequestDTO): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const appointmentInSameDate = await appointmentRepository.findByDate(appointmentDate);

    if (appointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    //aqui só está criando uma instância
    const appointment = appointmentRepository.create({ provider_id, date: appointmentDate });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}
