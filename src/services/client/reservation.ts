import Reservation from "@/entities/Reservation";

import ReservationData from "@/interfaces/reservation";

export async function createReservation(reservationData: ReservationData) {
  return await Reservation.createReservation(reservationData);
}

export async function findReservation(id: number) {
  const reservation = await Reservation.findOne({ userId: id });
  return reservation;
}
