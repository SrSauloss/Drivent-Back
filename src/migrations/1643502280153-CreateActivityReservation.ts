import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateActivityReservation1643502280153 implements MigrationInterface {
    name = "CreateActivityReservation1643502280153"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"activitiesReservation\" (\"id\" SERIAL NOT NULL, \"userId\" integer NOT NULL, \"activityId\" integer NOT NULL, CONSTRAINT \"PK_64b85d0767e1ee3536d4419ccd4\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"activitiesReservation\" ADD CONSTRAINT \"FK_b10d35100341cb58e5518a3af28\" FOREIGN KEY (\"activityId\") REFERENCES \"activities\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"activitiesReservation\" ADD CONSTRAINT \"FK_f0ac9fbbd958fcd703371ba254f\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activitiesReservation\" DROP CONSTRAINT \"FK_f0ac9fbbd958fcd703371ba254f\"");
      await queryRunner.query("ALTER TABLE \"activitiesReservation\" DROP CONSTRAINT \"FK_b10d35100341cb58e5518a3af28\"");
      await queryRunner.query("DROP TABLE \"activitiesReservation\"");
    }
}
