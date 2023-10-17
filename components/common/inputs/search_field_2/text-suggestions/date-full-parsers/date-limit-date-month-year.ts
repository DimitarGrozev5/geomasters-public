import { daysInMonth } from '../../../../../../utility/date/days-in-month';
import { months } from '../../../../../../utility/date/months';
import { capitalize } from '../../../../../../utility/string/capitalize';
import { Suggestion } from '../../partner-tasks-search-field-2';
import { parseDate } from '../date-component-parsers/parse-date';
import {
  parseFrom,
  parseRange,
  parseTo,
} from '../date-component-parsers/parse-limit';
import {
  parseNumericOrStringMonth,
  parseStringMonth,
} from '../date-component-parsers/parse-month';
import { parseYear } from '../date-component-parsers/parse-year';

const getLabel = (key: string) => {
  switch (key.toLowerCase()) {
    case 'от':
    case 'след':
      return 'От';
    case 'до':
    case 'преди':
      return 'До';
    case 'за':
      return 'За';

    default:
      return '';
  }
};

export const limitDateMonthYear = (txt: string[]): Suggestion[] => {
  if (txt.length < 1 || txt.length > 4) return [];

  // Exit if first argument is not a limit keyword
  if (!parseFrom()(txt[0]) && !parseTo()(txt[0]) && !parseRange()(txt[0]))
    return [];

  if (txt.length < 2 || (txt.length === 2 && txt[1].length === 0)) {
    return [
      {
        text: `${capitalize(getLabel(txt[0]))} <дата>.<месец>.<година>`,
        chips: [],
      },
    ];
  }

  // Parse date with mock data and return if false
  let dateResult = parseDate(0, 2022)(txt[1]);
  if (dateResult === false) return [];

  if (txt.length < 3 || (txt.length === 3 && txt[2].length === 0)) {
    return [{ text: `За ${txt[1]}.<месец>.<година>`, chips: [] }];
  }

  // Parse month and return if false
  const monthResult = parseNumericOrStringMonth()(txt[2]);
  if (monthResult === false) return [];

  // Recheck date with actual month and exit if no year is provided
  dateResult = parseDate(monthResult, 2022)(txt[1]);
  if (dateResult === false && txt.length < 3) return [];

  // If year is not provided, return suggestion without chips
  if (txt.length < 4) {
    return [
      {
        text: `За ${txt[1]}.${capitalize(months[monthResult])}.<година>`,
        chips: [],
      },
    ];
  }

  // Parse year and return if false
  const yearResult = parseYear([2, 4])(txt[3]);
  if (yearResult === false) return [];

  // Recheck date with actual month and exit if invalid
  dateResult = parseDate(monthResult, yearResult)(txt[1]);
  if (dateResult === false) return [];

  const bg = new Intl.DateTimeFormat('bg');

  if (parseFrom()(txt[0])) {
    const date = new Date(yearResult, monthResult, dateResult, 0, 0, 0, 0);
    const text = bg.format(date);
    return [
      {
        text: `От ${text}`,
        chips: [
          {
            type: 'date-from',
            value: text,
            raw: date.getTime().toString(),
          },
        ],
      },
    ];
  }

  if (parseTo()(txt[0])) {
    const date = new Date(yearResult, monthResult, dateResult, 23, 59, 59, 999);
    const text = bg.format(date);
    return [
      {
        text: `До ${text}`,
        chips: [
          {
            type: 'date-to',
            value: text,
            raw: date.getTime().toString(),
          },
        ],
      },
    ];
  }

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

  const startText = bg.format(startDate);
  const endText = bg.format(endDate);

  return [
    {
      text: `За ${startText}`,
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
