import Hotel from "@/entities/Hotel";
import HotelReservation from "@/entities/HotelReservation";
import ConflictError from "@/errors/ConflictError";

export async function getReservationByIdUser(id: number) {
  const res = await HotelReservation.findOne({ where: { id } });
  const resulHotelRoom = await HotelReservation.getReservationById(res?.hotelId, res?.userId, res?.roomId);
  const roomType = resulHotelRoom.room.getType();

  return {
    hotel: resulHotelRoom.hotel,
    room: resulHotelRoom.room,
    othersInRoom: resulHotelRoom.room.occupiedVacancies - 1,
    roomType,
  };
}

export async function saveReservation(userId: number, hotelId: number, roomId: number) {
  const hotel = await Hotel.getSpecifiedRoomAndSpecifiedReservation(userId, hotelId, roomId);

  if(hotel.rooms[0].getFreeVacancies() === 0) {
    throw new ConflictError("room is full");
  }

  const hotelReservation = hotel.hotelReservations[0];
  const newReservation = HotelReservation.create({ hotelId, userId, roomId });

  if(hotelReservation) {
    newReservation.id = hotelReservation.id;
    await hotelReservation.room.decrementOcuppiedVacancies();
  }

  await newReservation.save();
  await hotel.rooms[0].incrementOcuppiedVacancies();
}
