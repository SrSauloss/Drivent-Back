import { MigrationInterface, QueryRunner } from "typeorm";

export class NonUniqueTicket1643034027669 implements MigrationInterface {
    name = "NonUniqueTicket1643034027669"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"users_tickets\" DROP CONSTRAINT \"FK_07878fae961587066a149b9a166\"");
      await queryRunner.query("ALTER TABLE \"users_tickets\" DROP CONSTRAINT \"REL_07878fae961587066a149b9a16\"");
      await queryRunner.query("ALTER TABLE \"users_tickets\" ADD CONSTRAINT \"FK_07878fae961587066a149b9a166\" FOREIGN KEY (\"ticketId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"users_tickets\" DROP CONSTRAINT \"FK_07878fae961587066a149b9a166\"");
      await queryRunner.query("ALTER TABLE \"users_tickets\" ADD CONSTRAINT \"REL_07878fae961587066a149b9a16\" (\"ticketId\")");
      await queryRunner.query("ALTER TABLE \"users_tickets\" ADD CONSTRAINT \"FK_07878fae961587066a149b9a166\" FOREIGN KEY (\"ticketId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
