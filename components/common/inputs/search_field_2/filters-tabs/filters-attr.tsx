import {
  ButtonBase,
  Chip,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import { partnerAvailableStatus } from '../data/partner-available-statuses';
import { SearchValue } from '../search-value-type';
import FiltersCategories from './filters-categories';

type Props = {
  status: SearchValue | null;
  setStatus: (status: SearchValue | null) => void;
  category: SearchValue | null;
  setCategory: (status: SearchValue | null) => void;
};

const FiltersAttr: React.FC<Props> = ({
  status,
  setStatus,
  category,
  setCategory,
}) => {
  return (
    <List>
      <ListItem
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="subtitle2">Статус</Typography>
        <Stack direction="row" flexWrap="wrap" rowGap={1} gap={1}>
          {partnerAvailableStatus.map((st) => {
            return (
              <ButtonBase
                key={st.value}
                onClick={() =>
                  setStatus({
                    type: 'status',
                    value: st.plural,
                    raw: st.value,
                  })
                }
              >
                <Chip
                  label={st.plural}
                  color={status?.raw === st.value ? 'primary' : undefined}
                  clickable
                  style={{ cursor: 'pointer' }}
                />
              </ButtonBase>
            );
          })}
        </Stack>
      </ListItem>
      <Divider
        sx={{
          m: 2,
          ml: 1,
          mr: 1,
        }}
      />

      <ListItem
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <FiltersCategories category={category} setCategory={setCategory} />
      </ListItem>
    </List>
  );
};

export default FiltersAttr;
