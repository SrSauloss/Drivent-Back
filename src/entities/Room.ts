import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Hotel from "./Hotel";

@Entity("rooms")
export default class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    @Column()
    hotelId: number;

    @Column()
    occupiedVacancies: number;

    @Column()
    roomVacancies: number;

    @ManyToOne(() => Hotel, hotel => hotel.rooms)
    hotel: Hotel;
}
