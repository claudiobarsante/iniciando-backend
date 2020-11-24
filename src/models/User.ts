import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users") //decorator para mapear p a tabela no banco de dados 'appointments'
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column() //se não passsar nada o default é 'varchar'
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
