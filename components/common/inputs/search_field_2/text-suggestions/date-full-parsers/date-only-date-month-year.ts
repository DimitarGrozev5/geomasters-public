import { daysInMonth } from '../../../../../../utility/date/days-in-month';
import { months } from '../../../../../../utility/date/months';
import { capitalize } from '../../../../../../utility/string/capitalize';
import { Suggestion } from '../../partner-tasks-search-field-2';
import { parseNumericOrStringMonth } from '../date-component-parsers/parse-month';
import { parseYear } from '../date-component-parsers/parse-year';
import { parseDate } from '../date-component-parsers/parse-date';

export const onlyDateMonthAndYear = (txt: string[]): Suggestion[] => {
  if (txt.length < 1 || txt.length > 3) return [];

  // Parse date with mock data and return if false
  let dateResult = parseDate(0, 2022)(txt[0]);
  if (dateResult === false) return [];

  if (txt.length < 2 || (txt.length === 2 && txt[1].length === 0)) {
    return [{ text: `За ${txt[0]}.<месец>.<година>`, chips: [] }];
  }

  // Parse month and return if false
  const monthResult = parseNumericOrStringMonth()(txt[1]);
  if (monthResult === false) return [];

  // Recheck date with actual month and exit if no year is provided
  dateResult = parseDate(monthResult, 2022)(txt[0]);
  if (dateResult === false && txt.length < 3) return [];

  // If year is not provided, return suggestion without chips
  if (txt.length < 3) {
    return [
      {
        text: `За ${txt[0]}.${capitalize(months[monthResult])}.<година>`,
        chips: [],
      },
    ];
  }

  // Parse year and return if false
  const yearResult = parseYear([2, 4])(txt[2]);
  if (yearResult === false) return [];

  // Recheck date with actual month and exit if invalid
  dateResult = parseDate(monthResult, yearResult)(txt[0]);
  if (dateResult === false) return [];

  const startDate = new Date(yearResult, monthResult, dateResult, 0, 0, 0, 0);
  const endDate = new Date(
    yearResult,
    monthResult,
    dateResult,
    23,
    59,
    59,
    999
  );

  const bg = new Intl.DateTimeFormat('bg');
  const startText = bg.format(startDate);
  const endText = bg.format(endDate);

  return [
    {
      text: `За ${bg.format(startDate)}`,
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
