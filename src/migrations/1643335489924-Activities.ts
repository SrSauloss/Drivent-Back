import { MigrationInterface, QueryRunner } from "typeorm";

export class Activities1643335489924 implements MigrationInterface {
    name = "Activities1643335489924"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"places\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_1afab86e226b4c3bc9a74465c12\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"activities\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"startsAt\" TIMESTAMP WITH TIME ZONE NOT NULL, \"endsAt\" TIMESTAMP WITH TIME ZONE NOT NULL, \"rooms\" integer NOT NULL, \"placeId\" integer NOT NULL, CONSTRAINT \"PK_7f4004429f731ffb9c88eb486a8\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_d461b46a031313632ff16384fd2\" FOREIGN KEY (\"placeId\") REFERENCES \"places\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_d461b46a031313632ff16384fd2\"");
      await queryRunner.query("DROP TABLE \"activities\"");
      await queryRunner.query("DROP TABLE \"places\"");
    }
}
