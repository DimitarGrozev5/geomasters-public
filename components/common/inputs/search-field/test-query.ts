import { taskBasicCategoryValues } from '../../../../data/task-basic-category';
import { taskStatus } from '../../../../data/task-status';
import { parseDateRestriction } from './parseDate';
import { SearchValue } from './search-value-type';

// Piper for getting values from text
export const pipeGetValue = (
  value: string,
  ...getters: ((val: string) => SearchValue[])[]
): SearchValue[] => {
  const result = getters.reduce((result, getter) => {
    if (result.length > 0) {
      return result;
    }
    return getter(value);
  }, [] as SearchValue[]);

  return result.length > 0 ? result : [{ type: 'rnd-text', value, raw: '' }];
};

// Check if text value is a task status
export const partnerAvailableStatus = taskStatus.filter(
  (st) =>
    st.value !== 'REGISTERED' &&
    st.value !== 'REJECTED' &&
    st.value !== 'UNABLE_TO_FINISH'
);
export const getTaskStatus =
  (forPartner = true) =>
  (value: string): SearchValue[] => {
    const ts = !forPartner ? taskStatus : partnerAvailableStatus;
    const status = ts.find(
      (st) =>
        st.caption.toLowerCase() === value.toLowerCase() ||
        st.plural.toLowerCase() === value.toLowerCase()
    );
    if (status) {
      return [{ type: 'status', value: status.plural, raw: status.value }];
    }
    return [];
  };

// Check if text value is task basic category
export const getTaskCategory =
  () =>
  (value: string): SearchValue[] => {
    const category = taskBasicCategoryValues.find(
      (st) => st.caption.toLowerCase() === value.toLowerCase()
    );

    if (category) {
      return [
        { type: 'category', value: category.caption, raw: category.value },
      ];
    }
    return [];
  };

export const getDateRestriction =
  () =>
  (value: string): SearchValue[] => {
    return parseDateRestriction(value);
  };
