import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateHotelReservation1642780895622 implements MigrationInterface {
    name = "CreateHotelReservation1642780895622"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"hotelReservations\" (\"id\" SERIAL NOT NULL, \"hotelId\" integer NOT NULL, \"userId\" integer NOT NULL, \"roomId\" integer NOT NULL, CONSTRAINT \"PK_646057d2269a56170327277e921\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"UQ_1ce5592b8fd5529a35fb9fe1460\" UNIQUE (\"enrollmentId\")");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"hotelReservations\" ADD CONSTRAINT \"FK_73de85617721e29a96f5e50af5b\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"hotelReservations\" ADD CONSTRAINT \"FK_04df1c5acca6e0cbc0cec979b55\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"hotelReservations\" DROP CONSTRAINT \"FK_04df1c5acca6e0cbc0cec979b55\"");
      await queryRunner.query("ALTER TABLE \"hotelReservations\" DROP CONSTRAINT \"FK_73de85617721e29a96f5e50af5b\"");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"UQ_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("DROP TABLE \"hotelReservations\"");
    }
}
