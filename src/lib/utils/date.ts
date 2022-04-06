abstract class DateUtils {
  static getTimeDifferenceInMs(from: Date, to: Date): number {
    const result = from.getTime() - to.getTime();

    return result;
  }
}

export default DateUtils;
