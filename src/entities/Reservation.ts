import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
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

  @ManyToOne(() => Ticket, { eager: true })
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

    return Reservation.getReservation(data.userId);
  }

  static async getReservation(userId: number) {
    const reservation = await Reservation.findOne({ userId });

    if (!reservation) {
      return;
    }

    let price = reservation.ticket.price;

    if (reservation.ticket.name === "Hotel") {
      price =  600;
    }
    
    return {
      id: reservation.ticket.id,
      type: reservation.ticket.name.toLocaleLowerCase(),
      price
    };
  }
}

