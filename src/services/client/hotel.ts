import Hotel from "@/entities/Hotel";
import NotFoundError from "@/errors/NotFoundError";
import HotelInformation from "@/interfaces/hotelInformation";

export async function getAllHotels() {
  const hotels: HotelInformation[] = await Hotel.getAllHotelsAndRooms();
  hotels.forEach(hotel => {
    hotel.RoomTypes = hotel.getAllTypeRooms();
    hotel.totalVacancies = hotel.getTotalVacancies();
  });

  return hotels;
}

export async function getOneHotel(id: number) {
  const hotel = await Hotel.getSpecificHotelAndRooms(id);
  if(!hotel) {
    throw new NotFoundError();
  }
  return hotel;
}
