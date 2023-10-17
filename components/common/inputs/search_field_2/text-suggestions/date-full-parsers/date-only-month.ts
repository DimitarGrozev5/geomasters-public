import { daysInMonth } from '../../../../../../utility/date/days-in-month';
import { months } from '../../../../../../utility/date/months';
import { capitalize } from '../../../../../../utility/string/capitalize';
import { Suggestion } from '../../partner-tasks-search-field-2';
import { parseStringMonth } from '../date-component-parsers/parse-month';

export const onlyMonth = (txt: string[]): Suggestion[] => {
  if (txt.length !== 1) return [];

  const result = parseStringMonth()(txt[0]);

  if (result === false) return [];

  // Calculate year
  const now = new Date();
  const targetYear =
    result > now.getMonth() ? now.getFullYear() - 1 : now.getFullYear();

  const maxDays = daysInMonth(result, targetYear);

  const startDate = new Date(targetYear, result, 1, 0, 0, 0, 0);
  const endDate = new Date(targetYear, result, maxDays, 23, 59, 59, 999);

  const bg = new Intl.DateTimeFormat('bg');
  const startText = bg.format(startDate);
  const endText = bg.format(endDate);

  return [
    {
      text: `За ${capitalize(months[result])}, ${targetYear}г.`,
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
