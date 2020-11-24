import Appointment from "./../models/Appointment";
import { isEqual } from "date-fns";
import { EntityRepository, Repository } from "typeorm";

//O TYPEORM POR PADRÃO JÁ TEM UM REPOSITORY PADRÃO COM AS OPERAÇÕES DE CRUD, TIPO O UNITOFWORK🧐

// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }
//os modificadores de acesso private and public não existem no javascript,
//isso só é permitido por causa do typescript
@EntityRepository(Appointment) //decorator mapeando para Appointment na model
export default class AppointmentsRepository extends Repository<Appointment> {
  //-->para usar o repository padrão utilizar o extends Repository<aqui a tipagem>
  // private _appointments: Appointment[];

  // constructor() {
  //   this._appointments = [];
  // }

  /**
   * all - return all appointments
   */
  // public all(): Appointment[] {
  //   return this._appointments;
  // }
  /**
   * create an appointment
   */
  // public create({ provider, date }: CreateAppointmentDTO): Appointment {
  //   const appointment = new Appointment({ provider, date });
  //   this._appointments.push(appointment);
  //   return appointment;
  // }

  /**
   * findByDate find appointment by date
   */
  public async findByDate(date: Date): Promise<Appointment | null> {
    //--> como estou usando asyn o retorno sempre vai ser uma promise, então eu tenho q colocar Promise<aqui o tipo de retorno>
    // const findAppointmentInSameDate = this._appointments.find((appointment) =>
    //   isEqual(date, appointment.date)
    // );
    const findAppointmentInSameDate = await this.findOne({ where: { date: date } }); // o this se refere aos métodos que o repositório tem como padrão com o typeorm

    return findAppointmentInSameDate || null;
  }
}
