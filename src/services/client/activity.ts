import Activity from "@/entities/Activity";

export async function getDates() {
  return  Activity.getDates();
}
