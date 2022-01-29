import { getConnection } from "typeorm";
import { init } from "../../src/app";
import Enrollment from "../../src/entities/Enrollment";
import Address from "../../src/entities/Address";
import HotelReservation from "../../src/entities/HotelReservation";
import Reservation from "../../src/entities/Reservation";
import Session from "../../src/entities/Session";
import User from "../../src/entities/User";

export async function clearDatabase() {
  await Address.delete({});
  await Enrollment.delete({});
  await HotelReservation.delete({});
  await Reservation.delete({});
  await Session.delete({});
  await User.delete({});
}

export async function openConnection() {
  await init();
}

export async function closeConnection() {
  await getConnection().close();
}

