import { taskStatus } from '../../../../../data/task-status';
import { Suggestion } from '../partner-tasks-search-field-2';

export const getStatusSuggestions = (query: string): Suggestion[] => {
  const q = query.trim().toLowerCase();
  const suggs: Suggestion[] = taskStatus
    .filter(
      (st) =>
        st.caption.toLowerCase().startsWith(q) ||
        st.plural.toLowerCase().startsWith(q)
    )
    .map((sugg) => ({
      text: sugg.plural,
      chips: [{ type: 'status', value: sugg.plural, raw: sugg.value }],
    }));

  return suggs;
};
