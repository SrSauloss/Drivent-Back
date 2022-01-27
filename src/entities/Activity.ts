import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Place from "./Place";

@Entity("addresses")
export default class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startsAt: Date;

  @Column()
  endsAt: Date;

  @Column()
  totalRooms: number;

  @Column()
  freeRooms: number;

  @Column()
  placeId: number;

  @OneToOne(() => Place, { eager: true })
  @JoinColumn()
  place: Place;
}
