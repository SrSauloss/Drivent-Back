import Hotel from "@/entities/Hotel";
import Room from "@/entities/Room";
import User from "@/entities/User";
import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
