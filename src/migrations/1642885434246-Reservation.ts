import { MigrationInterface, QueryRunner } from "typeorm";

export class Reservation1642885434246 implements MigrationInterface {
    name = "Reservation1642885434246"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"reservations\" (\"id\" SERIAL NOT NULL, \"userId\" integer, \"ticketId\" integer, CONSTRAINT \"REL_aa0e1cc2c4f54da32bf8282154\" UNIQUE (\"userId\"), CONSTRAINT \"REL_d7dbf48ad681965ca77e3cbde1\" UNIQUE (\"ticketId\"), CONSTRAINT \"PK_da95cef71b617ac35dc5bcda243\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD \"isPayed\" boolean NOT NULL");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_aa0e1cc2c4f54da32bf8282154c\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_d7dbf48ad681965ca77e3cbde13\" FOREIGN KEY (\"ticketId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_d7dbf48ad681965ca77e3cbde13\"");
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_aa0e1cc2c4f54da32bf8282154c\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP COLUMN \"isPayed\"");
      await queryRunner.query("DROP TABLE \"reservations\"");
    }
}
