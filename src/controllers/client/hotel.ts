import Hotel from "@/entities/Hotel";
import HotelInformation from "@/interfaces/hotelInformation";
import { Request, Response } from "express";

export async function getAll(req: Request, res: Response) {
  const hotels: HotelInformation[] = await Hotel.getAllHotelsAndRooms();
  hotels.forEach(hotel => {
    hotel.RoomTypes = hotel.getAllTypeRooms();
    hotel.totalVacancies = hotel.getTotalVacancies();
  });

  res.send(hotels);
}

export async function getOne(req: Request, res: Response) {
  const id = +req.params.id;
  const hotel = await Hotel.getSpecificHotelAndRooms(id);
  res.send(hotel);
}
