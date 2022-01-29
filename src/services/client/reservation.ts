import ReservationData from "@/interfaces/reservation";
import Reservation from "@/entities/Reservation";
import Ticket from "@/entities/Ticket";
import NotFoundError from "@/errors/NotFoundError";

export async function createReservation(reservationData: ReservationData) {
  const ticket = await Ticket.getTicketById(reservationData.ticketId);

  if (!ticket) {
    throw new NotFoundError(`ticketId ${reservationData.ticketId} not found`);
  }

  return await Reservation.createReservation(reservationData);
}

export async function findReservation(userId: number) {
  const reservation = await Reservation.getReservation(userId);
  return reservation;
}
