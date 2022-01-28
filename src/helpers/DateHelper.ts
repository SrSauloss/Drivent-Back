import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const timezoneString =  "Africa/Abidjan";
dayjs.extend(utc);
dayjs.extend(timezone);

export default abstract class DateHelper  {
  static getDate(timestamp: Date) {
    return dayjs(timestamp).tz(timezoneString, true).format("DD/MM/YYYY");
  }
}
