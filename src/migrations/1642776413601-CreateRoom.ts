import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoom1642776413601 implements MigrationInterface {
    name = "CreateRoom1642776413601"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"rooms\" (\"id\" SERIAL NOT NULL, \"number\" character varying NOT NULL, \"hotelId\" integer NOT NULL, \"occupiedVacancies\" integer NOT NULL, \"roomVacancies\" integer NOT NULL, CONSTRAINT \"PK_0368a2d7c215f2d0458a54933f2\" PRIMARY KEY (\"id\"))");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("DROP TABLE \"rooms\"");
    }
}
