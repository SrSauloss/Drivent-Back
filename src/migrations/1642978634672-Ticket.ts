import { MigrationInterface, QueryRunner } from "typeorm";

export class Ticket1642978634672 implements MigrationInterface {
    name = "Ticket1642978634672"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"users_tickets\" DROP CONSTRAINT \"users_tickets_fk0\"");
      await queryRunner.query("ALTER TABLE \"users_tickets\" DROP CONSTRAINT \"users_tickets_fk1\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP COLUMN \"name\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD \"name\" character varying NOT NULL");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP COLUMN \"price\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD \"price\" integer NOT NULL");
      await queryRunner.query("ALTER TABLE \"users_tickets\" ADD CONSTRAINT \"UQ_8e5ca2d261f51c98d55d8bfc8b2\" UNIQUE (\"userId\")");
      await queryRunner.query("ALTER TABLE \"users_tickets\" ADD CONSTRAINT \"UQ_07878fae961587066a149b9a166\" UNIQUE (\"ticketId\")");
      await queryRunner.query("ALTER TABLE \"users_tickets\" ADD CONSTRAINT \"FK_8e5ca2d261f51c98d55d8bfc8b2\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"users_tickets\" ADD CONSTRAINT \"FK_07878fae961587066a149b9a166\" FOREIGN KEY (\"ticketId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"users_tickets\" DROP CONSTRAINT \"FK_07878fae961587066a149b9a166\"");
      await queryRunner.query("ALTER TABLE \"users_tickets\" DROP CONSTRAINT \"FK_8e5ca2d261f51c98d55d8bfc8b2\"");
      await queryRunner.query("ALTER TABLE \"users_tickets\" DROP CONSTRAINT \"UQ_07878fae961587066a149b9a166\"");
      await queryRunner.query("ALTER TABLE \"users_tickets\" DROP CONSTRAINT \"UQ_8e5ca2d261f51c98d55d8bfc8b2\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP COLUMN \"price\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD \"price\" numeric NOT NULL");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP COLUMN \"name\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD \"name\" character varying(255) NOT NULL");
      await queryRunner.query("ALTER TABLE \"users_tickets\" ADD CONSTRAINT \"users_tickets_fk1\" FOREIGN KEY (\"ticketId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"users_tickets\" ADD CONSTRAINT \"users_tickets_fk0\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
