import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import HotelReservation from "./HotelReservation";
import Room from "./Room";

@Entity("hotels")
export default class Hotel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @OneToMany(() => Room, room => room.hotel, { eager: true })
    rooms: Room[];

    @OneToMany(() => HotelReservation, hotelReservations => hotelReservations.hotel)
    hotelReservations: HotelReservation[];
}
