import Hotel from "@/entities/Hotel";

interface HotelInformation extends Hotel {
    RoomTypes?: string[];
    totalVacancies?: number;
}

export default HotelInformation;
