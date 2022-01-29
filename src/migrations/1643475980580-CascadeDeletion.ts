import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeDeletion1643475980580 implements MigrationInterface {
    name = "CascadeDeletion1643475980580"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_d461b46a031313632ff16384fd2\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"startsAt\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"startsAt\" TIMESTAMP NOT NULL");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"endsAt\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"endsAt\" TIMESTAMP NOT NULL");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"UQ_d461b46a031313632ff16384fd2\" UNIQUE (\"placeId\")");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_d461b46a031313632ff16384fd2\" FOREIGN KEY (\"placeId\") REFERENCES \"places\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_d461b46a031313632ff16384fd2\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"UQ_d461b46a031313632ff16384fd2\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"endsAt\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"endsAt\" TIMESTAMP WITH TIME ZONE NOT NULL");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"startsAt\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"startsAt\" TIMESTAMP WITH TIME ZONE NOT NULL");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_d461b46a031313632ff16384fd2\" FOREIGN KEY (\"placeId\") REFERENCES \"places\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
