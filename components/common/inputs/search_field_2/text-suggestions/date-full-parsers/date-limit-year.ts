import { capitalize } from '../../../../../../utility/string/capitalize';
import { Suggestion } from '../../partner-tasks-search-field-2';
import {
  parseFrom,
  parseRange,
  parseTo,
} from '../date-component-parsers/parse-limit';
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

export const limitYear = (txt: string[]): Suggestion[] => {
  if (txt.length < 1 || txt.length > 2) return [];

  // Exit if first argument is not a limit keyword
  if (!parseFrom()(txt[0]) && !parseTo()(txt[0]) && !parseRange()(txt[0]))
    return [];

  if (txt.length < 2 || (txt.length === 2 && txt[1].length === 0)) {
    return [
      {
        text: `${capitalize(getLabel(txt[0]))} <година>`,
        chips: [],
      },
    ];
  }

  const yearResult = parseYear([2, 4])(txt[1]);

  if (yearResult === false) return [];

  const bg = new Intl.DateTimeFormat('bg');

  if (parseFrom()(txt[0])) {
    const date = new Date(yearResult, 0, 1, 0, 0, 0, 0);
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
    const date = new Date(yearResult, 11, 31, 23, 59, 59, 999);
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

  const startDate = new Date(yearResult, 0, 1, 0, 0, 0, 0);
  const endDate = new Date(yearResult, 11, 31, 23, 59, 59, 999);

  const startText = bg.format(startDate);
  const endText = bg.format(endDate);

  return [
    {
      text: `За ${yearResult}г.`,
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
