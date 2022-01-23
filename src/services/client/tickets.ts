import Ticket from "@/entities/Ticket";

export async function getTickets() {
  const tickets = await Ticket.getTicketsObject();

  return tickets;
}
