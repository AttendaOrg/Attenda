export const isValidEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

/**
 * prefix the number with '0' if it is single digit
 * @param num number
 */
const padNumber = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

/**
 * return date in string format
 * @param date
 * @returns DD/MM/YYY
 */
export const convertDate = (date: Date): string =>
  `${padNumber(date.getDate())}/${date.getMonth() + 1}/${date.getFullYear()}`;

export const isAm = (hour: number): boolean => hour < 12;

/**
 * return time in string format
 * @param date
 * @returns HH:MM (AM/PM)
 */
export const convertTime = (date: Date): string =>
  `${
    date.getHours() > 12
      ? padNumber(date.getHours() % 12)
      : padNumber(date.getHours())
  }:${padNumber(date.getMinutes())} ${isAm(date.getHours()) ? 'AM' : 'PM'}`;

/**
 * return the date time is string format
 * @param date
 * @returns DD/MM/YY HH:MM (AM/PM)
 */
export const convertDateTime = (date: Date = new Date()): string =>
  `${convertDate(date)} ${convertTime(date)}`;

/**
 * wait for certain amount of time
 * @param time in milliseconds
 * @param resolves if the promise resolves or not
 */
export const wait = (time: number, resolves = true): Promise<void> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (resolves) resolve();
      else reject();
    }, time),
  );

export default {};
