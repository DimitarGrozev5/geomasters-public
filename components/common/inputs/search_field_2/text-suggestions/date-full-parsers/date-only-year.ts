import { Suggestion } from '../../partner-tasks-search-field-2';
import { parseYear } from '../date-component-parsers/parse-year';

export const onlyYear = (txt: string[]): Suggestion[] => {
  if (txt.length !== 1) return [];

  const result = parseYear([4])(txt[0]);

  if (result === false) return [];

  const startDate = new Date(result, 0, 1, 0, 0, 0, 0);
  const endDate = new Date(result, 11, 31, 23, 59, 59, 999);

  const bg = new Intl.DateTimeFormat('bg');
  const startText = bg.format(startDate);
  const endText = bg.format(endDate);

  return [
    {
      text: `За ${result}г.`,
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
