import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("places")
export default class Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  static async getPlaces() {
    return this.find();
  }
}
