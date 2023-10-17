import { Box, ButtonBase, Chip, Stack, Typography } from '@mui/material';
import { taskBasicCategoryValues } from '../../../../../data/task-basic-category';
import { SearchValue } from '../search-value-type';

type ChipProps = {
  value: string;
  caption: string;
  category: SearchValue | null;
  setCategory: (category: SearchValue | null) => void;
};
const CatChip: React.FC<ChipProps> = ({
  category,
  setCategory,
  value,
  caption,
}) => {
  return (
    <ButtonBase
      key={value}
      onClick={() =>
        setCategory({ type: 'category', value: caption, raw: value })
      }
    >
      <Chip
        label={caption}
        color={category?.raw === value ? 'secondary' : undefined}
        clickable
        style={{ cursor: 'pointer' }}
      />
    </ButtonBase>
  );
};

type Props = {
  category: SearchValue | null;
  setCategory: (category: SearchValue | null) => void;
};

const FiltersCategories: React.FC<Props> = ({ category, setCategory }) => {
  return (
    <>
      <Typography variant="subtitle2">Категории</Typography>
      <Stack direction="row" flexWrap="wrap" rowGap={1}>
        <Box sx={{ mr: 5 }}>
          <Typography variant="caption">Обща геодезия</Typography>
          <Stack direction="row" flexWrap="wrap" rowGap={1} gap={1}>
            {taskBasicCategoryValues.slice(0, 3).map((st) => (
              <CatChip
                key={st.value}
                value={st.value}
                caption={st.caption}
                category={category}
                setCategory={setCategory}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ mr: 5 }}>
          <Typography variant="caption">Кадастър</Typography>
          <Stack direction="row" flexWrap="wrap" rowGap={1} gap={1}>
            {taskBasicCategoryValues.slice(3, 7).map((st) => (
              <CatChip
                key={st.value}
                value={st.value}
                caption={st.caption}
                category={category}
                setCategory={setCategory}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ mr: 5 }}>
          <Typography variant="caption">Проектиране</Typography>
          <Stack direction="row" flexWrap="wrap" rowGap={1} gap={1}>
            {taskBasicCategoryValues.slice(7, 12).map((st) => (
              <CatChip
                key={st.value}
                value={st.value}
                caption={st.caption}
                category={category}
                setCategory={setCategory}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ mr: 5 }}>
          <Typography variant="caption">Други</Typography>
          <Stack direction="row" flexWrap="wrap" rowGap={1} gap={1}>
            {taskBasicCategoryValues.slice(12).map((st) => (
              <CatChip
                key={st.value}
                value={st.value}
                caption={st.caption}
                category={category}
                setCategory={setCategory}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default FiltersCategories;
