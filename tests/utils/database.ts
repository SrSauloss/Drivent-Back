import { getConnection } from "typeorm";
import { init } from "@/app";
import Enrollment from "@/entities/Enrollment";
import Address from "@/entities/Address";
import HotelReservation from "@/entities/HotelReservation";
import Reservation from "@/entities/Reservation";
import Session from "@/entities/Session";
import User from "@/entities/User";

export async function clearDatabase() {
  Address.clear();
  Enrollment.clear();
  HotelReservation.clear();
  Reservation.clear();
  Session.clear();
  User.clear();
}

export async function openConnection() {
  await init();
}

export async function closeConnection() {
  await getConnection().close();
}

