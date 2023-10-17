import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { TaskBasicCategory } from '@prisma/client';
import { taskBasicCategoryValues } from '../../../data/task-basic-category';

type Props = {
  value: TaskBasicCategory;
  onChange: (c: TaskBasicCategory) => void;
};

const TaskBasicCategorySelect: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = (e: SelectChangeEvent) => {
    onChange(e.target.value as TaskBasicCategory);
  };
  return (
    <FormControl fullWidth>
      <InputLabel>Категория на задачата</InputLabel>
      <Select value={value} label="Age" onChange={handleChange}>
        <ListSubheader
          sx={{ paddingLeft: 8, color: (theme) => theme.palette.primary.A500 }}
        >
          Обща геодезия
        </ListSubheader>
        {taskBasicCategoryValues.slice(0, 3).map((c) => (
          <MenuItem key={c.value} value={c.value}>
            {c.caption}
          </MenuItem>
        ))}

        <ListSubheader
          sx={{ paddingLeft: 8, color: (theme) => theme.palette.primary.A500 }}
        >
          Кадастър
        </ListSubheader>
        {taskBasicCategoryValues.slice(3, 7).map((c) => (
          <MenuItem key={c.value} value={c.value}>
            {c.caption}
          </MenuItem>
        ))}

        <ListSubheader
          sx={{ paddingLeft: 8, color: (theme) => theme.palette.primary.A500 }}
        >
          Проектиране
        </ListSubheader>
        {taskBasicCategoryValues.slice(7, 14).map((c) => (
          <MenuItem key={c.value} value={c.value}>
            {c.caption}
          </MenuItem>
        ))}

        <ListSubheader
          sx={{ paddingLeft: 8, color: (theme) => theme.palette.primary.A500 }}
        >
          Други
        </ListSubheader>
        {taskBasicCategoryValues.slice(14).map((c) => (
          <MenuItem key={c.value} value={c.value}>
            {c.caption}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TaskBasicCategorySelect;
