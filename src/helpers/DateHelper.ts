import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const timezoneString =  "America/Bahia";
dayjs.extend(utc);
dayjs.extend(timezone);

export default abstract class DateHelper  {
  static getDate(date: Date) {
    return dayjs(date).tz(timezoneString, true).format("YYYY-MM-DD");
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

  static getHourMin(date: string | Date) {
    return dayjs(date).format("HH:mm");
  }

  static getYear(date: string | Date) {
    return dayjs(date).format("YYYY");
  }

  static getDay(date: string | Date) {
    return dayjs(date).format("DD");
  }

  static getMonth(date: string | Date) {
    return dayjs(date).format("M");
  }

  static isBefore(date1: string | Date, date2: string | Date) {
    return dayjs(date1).isBefore(dayjs(date2));
  }

  static getDiff(date1: string | Date, date2: string | Date) {
    return dayjs(date1).diff(dayjs(date2));
  }
}
