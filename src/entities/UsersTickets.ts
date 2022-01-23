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

@Entity("users_tickets")
export default class UsersTicket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  ticketId: number;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @OneToOne(() => Ticket, { eager: true })
  @JoinColumn()
  ticket: Ticket;
}

