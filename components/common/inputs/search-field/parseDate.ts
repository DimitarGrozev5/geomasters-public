import { string } from 'zod';
import { SearchValue } from './search-value-type';

// Check if text value is a date constraint
const fullMonths = [
  'януари',
  'февруари',
  'март',
  'април',
  'май',
  'юни',
  'юли',
  'август',
  'септември',
  'октомври',
  'ноември',
  'декември',
];

const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const isNum = (d: string) => nums.includes(d);

const daysOfMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate();

/// Parse year
const getYear = (txt: string, acceptShortYear = true): number | false => {
  // The year has to be numeric and has to be 2 or 4 digits long
  const len = acceptShortYear ? [2, 4] : [4];

  if (!len.includes(txt.length)) return false;
  const yearIsNumeric = txt.split('').every((d) => isNum(d));
  if (!yearIsNumeric) return false;

  let year = Number(txt);
  if (year < 100) year += 2000;

  return year;
};

/// Parse month
const getStringMonth = (
  txt: string,
  fullStringOnly = false
): number | false => {
  const test = (month: string) =>
    fullStringOnly
      ? month.toLowerCase() === txt.toLowerCase()
      : txt.length >= 3 && month.toLowerCase().startsWith(txt.toLowerCase());

  const monthIndex = fullMonths.findIndex(test);
  if (monthIndex < 0) {
    return false;
  }
  return monthIndex;
};
const getMonth = (txt: string, fullStringOnly = false): number | false => {
  // Month can be numeric or string
  let month: number;
  const monthIsNumeric = txt.split('').every((d) => isNum(d));
  if (monthIsNumeric) {
    const numMonth = Number(txt);

    if (numMonth < 1 || numMonth > 12) {
      return false;
    }
    month = numMonth - 1;
  } else {
    const res = getStringMonth(txt, fullStringOnly);
    if (res === false) return false;
    month = res;
  }
  return month;
};

/// Parse date
const getDate = (txt: string, month: number, year: number): number | false => {
  // Date should be numeric and fit in the month
  const dateIsNumeric = txt.split('').every((d) => isNum(d));
  if (!dateIsNumeric) return false;

  const numDate = Number(txt);
  const daysInMonth = daysOfMonth(year, month);
  if (numDate <= 0 || numDate > daysInMonth) return false;

  const date = numDate;
  return date;
};

const getDateObject = (
  txt: string,
  isFrom: boolean,
  monthFullStringOnly = false,
  allowOnlyYear = true
): Date | false => {
  const comps = txt.split('.');

  let year: number | false = false;
  let month: number | false = false;
  let date: number | false = false;

  // Get full date
  if (comps.length === 3) {
    year = getYear(comps[2]);
    if (year === false) return false;

    month = getMonth(comps[1]);
    if (month === false) return false;

    date = getDate(comps[0], month, year);
  }

  // If only two components, then it's month and year
  if (comps.length === 2) {
    year = getYear(comps[1]);
    if (year === false) return false;

    month = getMonth(comps[0]);
    if (month === false) return false;

    date = isFrom ? 1 : daysOfMonth(year, month);
  }

  // If only one component, then it's either string month or year
  if (comps.length === 1) {
    year = allowOnlyYear ? getYear(comps[0], false) : false;
    // If a year is parsed, set the date to Jan 1 or Dec 31 and exit IF statement
    if (year !== false) {
      month = 0;
      date = isFrom ? 1 : 31;

      // If a year is not parsed, try to parse string month
    } else {
      month = getStringMonth(comps[0], monthFullStringOnly);
      if (month === false) return false;

      const today = new Date();
      // If the month has passed, set the year to prev
      year =
        month > today.getUTCMonth()
          ? today.getUTCFullYear() - 1
          : today.getUTCFullYear();

      date = isFrom ? 1 : daysOfMonth(year, month);
    }
  }

  if (year === false || month === false || date === false) return false;
  return new Date(year, month, date, 0, 0, 0, 0);
};

const fromKeywords = ['от', 'след'];
const toKeywords = ['до', 'преди'];
const forKeywords = ['за'];

const fd = (date: Date) => new Intl.DateTimeFormat('bg').format(date);

export const parseDateRestriction = (txt: string): SearchValue[] => {
  const comps = txt.toLowerCase().trim().split(' ');

  if (comps.length > 2) return [];

  // If two components, test for keyword -> date
  if (comps.length === 2) {
    const isFrom = fromKeywords.includes(comps[0]);
    const isTo = toKeywords.includes(comps[0]);
    const isFor = forKeywords.includes(comps[0]);

    if (!isFrom && !isTo && !isFor) return [];

    if (isFrom) {
      const date = getDateObject(comps[1], true);
      if (!date) return [];
      return [
        {
          type: 'date-from',
          value: `${fd(date)}`,
          raw: `${date.getTime()}`,
        },
      ];
    }
    if (isTo) {
      const date = getDateObject(comps[1], false);
      if (!date) return [];
      return [
        {
          type: 'date-to',
          value: `${fd(date)}`,
          raw: `${date.getTime()}`,
        },
      ];
    }
    if (isFor) {
      // Get start and end date
      const date1 = getDateObject(comps[1], true);
      const date2 = getDateObject(comps[1], false);
      if (!date1 || !date2) return [];
      return [
        {
          type: 'date-from',
          value: `${fd(date1)}`,
          raw: `${date1.getTime()}`,
        },
        {
          type: 'date-to',
          value: `${fd(date2)}`,
          raw: `${date2.getTime()}`,
        },
      ];
    }
  }

  // If one component, test only for date
  if (comps.length === 1) {
    // Get start and end date
    const date1 = getDateObject(comps[0], true, true, false);
    const date2 = getDateObject(comps[0], false, true, false);
    if (!date1 || !date2) return [];
    return [
      {
        type: 'date-from',
        value: `${fd(date1)}`,
        raw: `${date1.getTime()}`,
      },
      {
        type: 'date-to',
        value: `${fd(date2)}`,
        raw: `${date2.getTime()}`,
      },
    ];
  }

  return [];
};
