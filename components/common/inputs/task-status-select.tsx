import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { TaskStatus } from '@prisma/client';
import { Controller } from 'react-hook-form';
import { taskBasicCategoryValues } from '../../../data/task-basic-category';
import { taskStatus } from '../../../data/task-status';

type Props = {
  value: TaskStatus;
  onChange: (c: TaskStatus) => void;
};

const TaskStatusSelect: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = (e: SelectChangeEvent) => {
    onChange(e.target.value as TaskStatus);
  };
  return (
    <FormControl fullWidth>
      <InputLabel>Статус на задачата</InputLabel>
      <Select value={value} label="Статус на задачата" onChange={handleChange}>
        {taskStatus.map((c) => (
          <MenuItem key={c.value} value={c.value}>
            {c.caption}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TaskStatusSelect;
