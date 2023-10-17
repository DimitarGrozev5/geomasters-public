import { Suggestion } from '../partner-tasks-search-field-2';
import { limitDateMonthYear } from './date-full-parsers/date-limit-date-month-year';
import { limitMonth } from './date-full-parsers/date-limit-month';
import { limitMonthYear } from './date-full-parsers/date-limit-month-year';
import { limitYear } from './date-full-parsers/date-limit-year';
import { onlyDateMonthAndYear } from './date-full-parsers/date-only-date-month-year';
import { onlyMonth } from './date-full-parsers/date-only-month';
import { onlyMonthAndYear } from './date-full-parsers/date-only-month-and-year';
import { onlyYear } from './date-full-parsers/date-only-year';

export const getDateSuggestions = (query: string): Suggestion[] => {
  const q = query.trim().toLowerCase().split(/ |\./);

  const suggs: Suggestion[] = [
    onlyYear,
    onlyMonth,
    onlyMonthAndYear,
    onlyDateMonthAndYear,
    limitYear,
    limitMonth,
    limitMonthYear,
    limitDateMonthYear,
  ].flatMap((parser) => parser(q));

  return suggs;
};
