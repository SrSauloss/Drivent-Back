import {  BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}
