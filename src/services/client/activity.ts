import Activity from "@/entities/Activity";

export async function getDates() {
  return  Activity.getDates();
}

export async function getActivitiesByDate(date: string) {
  return  Activity.getActivitiesByDate(date);
}
