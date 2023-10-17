import { ZeroBasedMonthIndex } from './types';

export const daysInMonth = (month: ZeroBasedMonthIndex, year: number): number =>
  new Date(year, month + 1, 0).getDate();
