import {  BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import Reservation from "./Reservation";

@Entity("tickets")
export default class Ticket extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isInPerson: boolean;

    @Column()
    hasHotel: boolean;

    @Column()
    isPayed: boolean;

    @Column()
    reservationId: number;

    @OneToOne(() => Reservation)
    reservation: Reservation;
}
