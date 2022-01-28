import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const timezoneString =  "America/Bahia";
dayjs.extend(utc);
dayjs.extend(timezone);

export default abstract class DateHelper  {
  static getDate(date: Date) {
    return dayjs(date).tz(timezoneString, true).format("DD/MM/YYYY");
  }

  static startOfDay(date: string) {
    return dayjs(date).tz(timezoneString, true).startOf("day").toDate();
  }

  static endOfDay(date: string) {
    return dayjs(date).tz(timezoneString, true).endOf("day").toDate();
  }

  static updateTimezone(date: string | Date) {
    return dayjs(date).tz(timezoneString, true).toDate();
  }

  static getHour(date: string | Date) {
    return dayjs(date).format("HH:mm");
  }
}
