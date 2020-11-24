import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateAppointments1605830067608 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "appointments",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()", //função para gerar o uuid
          },
          {
            name: "provider",
            type: "varchar",
            // isNullable: false,-> por padrão todo campo o isNullabe é false
          },
          {
            name: "date",
            type: "timestamp with time zone",
            // isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("appointments");
  }
}
