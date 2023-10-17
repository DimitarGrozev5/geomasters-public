import { taskStatus } from '../../../../../data/task-status';

// Check if text value is a task status
export const partnerAvailableStatus = taskStatus.filter(
  (st) =>
    st.value !== 'REGISTERED' &&
    st.value !== 'REJECTED' &&
    st.value !== 'UNABLE_TO_FINISH'
);
