import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Hotel from "./Hotel";
import HotelReservation from "./HotelReservation";

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

    @OneToMany(() => HotelReservation, hotelReservations => hotelReservations.hotel)
    hotelReservations: HotelReservation[];

    getFreeVacancies() {
      return this.roomVacancies - this.occupiedVacancies;
    }

    getType() {
      return this.roomVacancies === 1 ? "single" : this.roomVacancies === 2 ? "double" : "triple";
    }

    async incrementOcuppiedVacancies() {
      this.occupiedVacancies++;
      await this.save();
    }

    async decrementOcuppiedVacancies() {
      this.occupiedVacancies--;
      await this.save();
    }
}
