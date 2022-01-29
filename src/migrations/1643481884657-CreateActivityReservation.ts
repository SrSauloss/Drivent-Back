import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateActivityReservation1643481884657 implements MigrationInterface {
    name = "CreateActivityReservation1643481884657"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"activitiesReservation\" (\"id\" SERIAL NOT NULL, \"userId\" integer NOT NULL, \"activityId\" integer NOT NULL, \"activitiesId\" integer, CONSTRAINT \"PK_64b85d0767e1ee3536d4419ccd4\" PRIMARY KEY (\"id\"))");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("DROP TABLE \"activitiesReservation\"");
    }
}
