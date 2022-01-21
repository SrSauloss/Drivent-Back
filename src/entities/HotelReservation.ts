import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Hotel from "./Hotel";
import Room from "./Room";
import User from "./User";

@Entity("hotelReservations")
export default class HotelReservation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hotelId: number;

    @Column()
    userId: number;

    @Column()
    roomId: number;

    @ManyToOne(() => Hotel, hotel => hotel.hotelReservations)
    hotel: Hotel;

    @ManyToOne(() => Room, room => room.hotelReservations)
    room: Room;

    @OneToOne(() => User, user => user.hotelReservation)
    user: User;
}
