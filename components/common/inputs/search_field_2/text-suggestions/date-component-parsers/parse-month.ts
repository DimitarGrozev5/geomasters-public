import { months } from '../../../../../../utility/date/months';
import { isNumeric } from '../../../../../../utility/isNumeric';

type ZeroBasedMonthIndex = number;
export const parseNumericMonth =
  () =>
  (txt: string): false | ZeroBasedMonthIndex => {
    if (!isNumeric(txt)) return false;
    if (txt.length > 2) return false;

    const m = Number(txt);

    if (m < 1 || m > 12) return false;

    return m - 1;
  };

export const parseStringMonth =
  () =>
  (txt: string): false | ZeroBasedMonthIndex => {
    const t = txt.trim().toLowerCase();
    if (t.length < 3) return false;

    const indexOfMonth = months.findIndex((month) =>
      month.toLowerCase().startsWith(t)
    );
    if (indexOfMonth < 0) return false;

    return indexOfMonth;
  };

export const parseNumericOrStringMonth =
  () =>
  (txt: string): false | ZeroBasedMonthIndex => {
    const numericResult = parseNumericMonth()(txt);
    if (numericResult !== false) return numericResult;

    const stringResult = parseStringMonth()(txt);
    return stringResult;
  };
