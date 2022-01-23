
import ReservationData from "@/interfaces/reservation";
import Reservation from "@/entities/Reservation";

export async function createReservation(reservationData: ReservationData) {
  return await Reservation.createReservation(reservationData);
}

export async function findReservation(userId: number) {
  const reservation = await Reservation.getReservation(userId);
  return reservation;
}
