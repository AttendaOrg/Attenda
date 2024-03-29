/* eslint-disable no-bitwise */
/* eslint-disable no-cond-assign */
/* eslint-disable no-plusplus */
import {
  MarkedDates,
  MarkTime,
} from '../components/organisms/Student/AttendanceRecord';

export const isValidEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

/**
 * checks if the password is strong
 * @param password
 */
export const isStrongPassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * prefix the number with '0' if it is single digit
 * @param num number
 */
export const padNumber = (num: number): string =>
  num < 10 ? `0${num}` : `${num}`;

/**
 * return date in string format
 * @param date
 * @returns DD/MM/YYY
 */
export const convertDate = (date: Date): string =>
  `${padNumber(date.getDate())}/${padNumber(
    date.getMonth() + 1,
  )}/${date.getFullYear()}`;

export const isAm = (hour: number): boolean => hour < 12;

/**
 * return time in string format
 * @param date
 * @returns HH:MM (AM/PM)
 */
export const convertTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const AmOrPm = hours >= 12 ? 'PM' : 'AM';

  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'

  const strTime = `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(
    seconds,
  )} ${AmOrPm}`;

  return strTime;
};

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

export const convertDateFormat = (date: Date): string =>
  `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(
    date.getDate(),
  )}`;

export const matchDate = (date1: Date, date2: Date): boolean =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate() &&
  date1.getHours() === date2.getHours() &&
  date1.getMinutes() === date2.getMinutes() &&
  date1.getSeconds() === date2.getSeconds();

/**
 * gets the starting date of the month and starting day of the next month
 * @param month
 * @returns [startDayOfTheMonth,nextMonthStartDay]
 * @example
 * const date = new Date(); // Fri Jan 22 2021 22:33:08 GMT+0530 (India Standard Time)
 * const [ startDayOfTheMonth,nextMonthStartDay ] = getMonthRange(date);
 * // [Wed Dec 01 2021 00:00:00 GMT+0530 (India Standard Time), Sat Jan 01 2022 00:00:00 GMT+0530 (India Standard Time)]
 */
export const getMonthRange = (month: Date): [Date, Date] => {
  const startingMonthDate = new Date(month);
  const endingMonthDate = new Date(month);

  startingMonthDate.setDate(1);
  endingMonthDate.setDate(1);
  endingMonthDate.setMonth(month.getMonth() + 1);

  return [startingMonthDate, endingMonthDate];
};

export default {};

/**
 * throttles a function calls for specific amount of time
 * @param callback
 * @param waitFor
 */
export const throttle = <T>(
  callback: (arg: T) => void,
  waitFor: number,
): ((arg: T) => void) => {
  let lastFunc: number | undefined;
  let lastRan = 0;

  return (...args) => {
    if (!lastRan) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      callback.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = (setTimeout(() => {
        if (Date.now() - lastRan >= waitFor) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          callback.apply(this, args);
          lastRan = Date.now();
        }
      }, waitFor - (Date.now() - lastRan)) as unknown) as number;
    }
  };
};

export const convertEnumToStr = <T>(e: unknown, val: T): string => {
  // on compile typescript enum converts to a json object.
  // which have the following structure
  // { [key1]: value1, [value1]:key1 }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (e[val] !== undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return e[val];
  }

  return 'unknown';
};

export const convertMarkedDateToTimes = (
  markedDates: MarkedDates,
  currentDate: string,
): MarkTime[] =>
  Object.entries(markedDates[currentDate] ?? []).map(([key, val]) => ({
    [key]: val,
  }));

const b64ch =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const b64chs = b64ch.split('');

/**
 * Binary to ASCII (encode data to Base64)
 * @param {String} bin
 * @returns {String}
 */
export const base64Encode = (bin: string): string => {
  // console.log('polyfilled');
  let u32;
  let c0;
  let c1;
  let c2;
  let asc = '';
  const pad = bin.length % 3;

  for (let i = 0; i < bin.length; ) {
    if (
      (c0 = bin.charCodeAt(i++)) > 255 ||
      (c1 = bin.charCodeAt(i++)) > 255 ||
      (c2 = bin.charCodeAt(i++)) > 255
    )
      throw new TypeError('invalid character found');
    u32 = (c0 << 16) | (c1 << 8) | c2;
    asc +=
      b64chs[(u32 >> 18) & 63] +
      b64chs[(u32 >> 12) & 63] +
      b64chs[(u32 >> 6) & 63] +
      b64chs[u32 & 63];
  }

  return pad ? asc.slice(0, pad - 3) + '==='.substring(pad) : asc;
};

export const hashCode = (str: string): number => {
  let hash = 0;

  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);

    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }

  return hash;
};
