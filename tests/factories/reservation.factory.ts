import * as reservationService from "../../src/services/client/reservation";
import * as ticketFactory from "./ticket.factory";

const createReservation = async( userId: number) => {
  const ticket = await ticketFactory.getRandomTicket();

  return reservationService.createReservation({ 
    userId, 
    ticketId: ticket.id
  });
};

export {
  createReservation
};
