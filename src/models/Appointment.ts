import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import User from "./User";

@Entity("appointments") //decorator para mapear p a tabela no banco de dados 'appointments'
export default class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column() //se não passsar nada o default é 'varchar'
  provider_id: string;

  @ManyToOne(() => User) //qual o model q ele deve chamar, pode passar por uma função ()=> User
  @JoinColumn({ name: "provider_id" }) //qual a coluna q está relacionada com esse relacionamento
  provider: User;

  @Column("timestamp with time zone")
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // constructor({ provider, date }: Omit<Appointment, "id">) {
  //   //o Omit -> vai receber as variáveis provider e date, menos o id
  //   this.id = uuidv4();
  //   this.provider = provider;
  //   this.date = date;
  // }
}
