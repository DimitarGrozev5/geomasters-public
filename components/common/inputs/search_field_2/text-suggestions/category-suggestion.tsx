import { taskBasicCategoryValues } from '../../../../../data/task-basic-category';
import { Suggestion } from '../partner-tasks-search-field-2';

export const getCategorySuggestions = (query: string): Suggestion[] => {
  const q = query.trim().toLowerCase();
  const suggs: Suggestion[] = taskBasicCategoryValues
    .filter((st) => st.caption.toLowerCase().search(q) >= 0)
    .map((sugg) => ({
      text: sugg.caption,
      chips: [
        {
          type: 'category',
          value: sugg.caption,
          raw: sugg.value,
        },
      ],
    }));

  return suggs;
};
