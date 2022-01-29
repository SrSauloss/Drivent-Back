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

    static async getRandomTicket() {
      const array = await this.createQueryBuilder()
        .select("*")
        .from(Ticket, "ticket")
        .orderBy("RANDOM()")
        .limit(1)
        .execute();
      return array[0];
    }
}
