import Activity from "@/entities/Activity";

export async function getDates() {
  return  Activity.getDates();
}

export async function getActivitiesByDate(date: string) {
  return  Activity.getActivitiesByDate(date);
}

export async function saveInscription(userId: number, activityId: number) {
  const resul = await Activity.subscribe(userId, activityId);
  return resul;
}
