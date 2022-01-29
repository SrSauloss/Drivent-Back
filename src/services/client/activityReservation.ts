import ActivityReservation from "@/entities/ActivityReservation";

export async function getActivitiesReservation(id: number) {
  return await ActivityReservation.getActivitiesReservationByUserId(id);
}
