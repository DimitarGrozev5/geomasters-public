import { daysInMonth } from '../../../../../../utility/date/days-in-month';
import { ZeroBasedMonthIndex } from '../../../../../../utility/date/types';
import { isNumeric } from '../../../../../../utility/isNumeric';

export const parseDate =
  (month: ZeroBasedMonthIndex, year: number) =>
  (txt: string): false | number => {
    if (!isNumeric(txt)) return false;

    const d = Number(txt);
    if (d < 1) return false;

    // Get days in month
    const maxDays = daysInMonth(month, year);
    if (d > maxDays) return false;

    return d;
  };
