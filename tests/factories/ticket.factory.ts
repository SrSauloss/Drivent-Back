import Ticket from "../../src/entities/Ticket";

const getRandomTicket = async() => {
  return Ticket.getRandomTicket();
};

export {
  getRandomTicket
};
