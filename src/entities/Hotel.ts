import NotFoundError from "@/errors/NotFoundError";
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

    getTotalVacancies() {
      const vancancies = this.rooms.reduce((sum, room) => {
        return sum + room.getFreeVacancies();
      }, 0);

      return vancancies;
    }

    getAllTypeRooms() {
      const types = {
        single: false,
        double: false,
        triple: false,
      };

      this.rooms.forEach(room => {
        types[room.getType()] = true;
      });

      const arrayTypes: string[] = [];
      Object.entries(types).forEach((obj) => {
        if(obj[1]) arrayTypes.push(obj[0]);
      });

      return arrayTypes;
    }

    static async getAllHotelsAndRooms() {
      return await this.createQueryBuilder("hotel")
        .leftJoinAndSelect("hotel.rooms", "rooms")
        .orderBy("rooms.id", "ASC")
        .getMany();
    }

    static async getSpecificHotelAndRooms(id: number) {
      return await this.createQueryBuilder("hotel")
        .leftJoinAndSelect("hotel.rooms", "rooms")
        .where("hotel.id = :id", { id })
        .orderBy("rooms.id", "ASC")
        .getOne();
    }

    static async getSpecifiedRoomAndSpecifiedReservation(userId: number, hotelId: number, roomId: number) {
      const hotel =  await this.createQueryBuilder("hotel")
        .leftJoinAndSelect("hotel.rooms", "rooms", "rooms.id = :roomId", { roomId })
        .leftJoinAndSelect("hotel.hotelReservations", "hotelReservations", "hotelReservations.userId = :userId", { userId })
        .leftJoinAndSelect("hotelReservations.room", "reservationRoom")
        .where("hotel.id = :hotelId", { hotelId })
        .getOne();

      if(!hotel || hotel.rooms.length === 0) throw new NotFoundError();
      return hotel;
    }
}
