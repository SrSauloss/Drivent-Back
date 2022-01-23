import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Ticket from "./Ticket";
import User from "./User";
import ReservationData from "@/interfaces/reservation";

@Entity("users_tickets")
export default class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  ticketId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Ticket, { eager: true })
  @JoinColumn()
  ticket: Ticket;

  populateFromData(data: ReservationData) {
    this.userId = data.userId;
    this.ticketId = data.ticketId;
  }

  static async createReservation(data: ReservationData) {
    const reservation = Reservation.create();
    reservation.populateFromData(data);
    await reservation.save();
  }

  static async getReservation(userId: number) {
    const reservation = await Reservation.findOne({ userId });

    return {
      id: reservation.ticket.id,
      type: reservation.ticket.name.toLocaleLowerCase()
    };
  }
}

