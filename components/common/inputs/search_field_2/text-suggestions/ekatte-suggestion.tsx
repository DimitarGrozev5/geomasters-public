import { ekatte } from '../../../../../data/ekatte';
import { Suggestion } from '../partner-tasks-search-field-2';

export const getEkatteSuggestions = (query: string): Suggestion[] => {
  const q = query.trim().toLowerCase();

  // If the query is less that 4 symbols, don't give suggestions
  // This is because we want to limit the number of suggestions
  if (q.length < 4) {
    return [];
  }
  const suggs: Suggestion[] = ekatte
    .filter(
      (e) => e.ekatte.startsWith(q) || e.label.toLowerCase().search(q) >= 0
    )
    .map((sugg) => ({
      text: `${sugg.label}, ${sugg.ekatte}`,
      chips: [
        {
          type: 'ekatte',
          value: `${sugg.label}, ${sugg.ekatte}`,
          raw: sugg.ekatte,
        },
      ],
    }));

  return suggs;
};
