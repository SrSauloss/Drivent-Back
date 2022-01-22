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

@Entity("reservations")
export default class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  ticketId: number;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @OneToOne(() => Ticket, (ticket) => ticket.reservation, { eager: true })
  @JoinColumn()
  ticket: Ticket;

  static async createReservation(data: ReservationData) {
    const reservation = this.create();
    reservation.userId = data.userId;

    await reservation.save();
    reservation.ticket = new Ticket();
    reservation.ticket.hasHotel = data.hasHotel;
    reservation.ticket.isInPerson = data.isInPerson;
    reservation.ticket.reservationId = reservation.id;

    await reservation.save();

    reservation.ticketId = reservation.ticket.id;

    await reservation.save();
    return reservation;
  }
}
