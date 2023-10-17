import { daysInMonth } from '../../../../../../utility/date/days-in-month';
import { months } from '../../../../../../utility/date/months';
import { capitalize } from '../../../../../../utility/string/capitalize';
import { Suggestion } from '../../partner-tasks-search-field-2';
import { parseStringMonth } from '../date-component-parsers/parse-month';
import { parseYear } from '../date-component-parsers/parse-year';

export const onlyMonthAndYear = (txt: string[]): Suggestion[] => {
  if (txt.length < 1 || txt.length > 2) return [];

  // Parse month and return if false
  const monthResult = parseStringMonth()(txt[0]);
  if (monthResult === false) return [];

  // If year is not provided, return suggestion without chips
  if (txt.length !== 2) {
    return [
      { text: `За ${capitalize(months[monthResult])}.<година>`, chips: [] },
    ];
  }

  // Parse year and return if false
  const yearResult = parseYear([2, 4])(txt[1]);
  if (yearResult === false) return [];

  const maxDays = daysInMonth(monthResult, yearResult);

  const startDate = new Date(yearResult, monthResult, 1, 0, 0, 0, 0);
  const endDate = new Date(yearResult, monthResult, maxDays, 23, 59, 59, 999);

  const bg = new Intl.DateTimeFormat('bg');
  const startText = bg.format(startDate);
  const endText = bg.format(endDate);

  return [
    {
      text: `За ${months[monthResult]}, ${yearResult}г.`,
      chips: [
        {
          type: 'date-from',
          value: startText,
          raw: startDate.getTime().toString(),
        },
        {
          type: 'date-to',
          value: endText,
          raw: endDate.getTime().toString(),
        },
      ],
    },
  ];
};
