import {  BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("tickets")
export default class Ticket extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    static async getTicketsObject() {
      const tickets = await this.find();
    
      const ticketsObject: any = {};

      tickets.forEach((ticket) => {
        ticketsObject[ticket.name.toLocaleLowerCase()] = {
          ...ticket,
        };
      });    

      return ticketsObject;
    }
}
