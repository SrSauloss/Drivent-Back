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
}
