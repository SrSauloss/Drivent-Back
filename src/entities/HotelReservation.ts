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

    @ManyToOne(() => Hotel, hotel => hotel.hotelReservations, { onDelete: "CASCADE" })
    hotel: Hotel;

    @ManyToOne(() => Room, room => room.hotelReservations, { onDelete: "CASCADE" })
    room: Room;

    @OneToOne(() => User, user => user.hotelReservation, { onDelete: "CASCADE" })
    user: User;

    static async getReservationById(hotelId: number, userId: number, roomId: number) {
      return await this.createQueryBuilder("hotelReservation")
        .leftJoinAndSelect("hotelReservation.hotel", "hotel", "hotel.id = :hotelId", { hotelId })
        .leftJoinAndSelect("hotelReservation.room", "room", "room.id = :roomId", { roomId })
        .where("hotelReservation.userId = :userId", { userId })
        .getOne();
    }
}
