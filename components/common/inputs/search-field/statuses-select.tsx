import { ButtonBase, Chip, Stack, Typography } from '@mui/material';
import { taskStatus } from '../../../../data/task-status';
import { SearchValue } from './search-value-type';
import { partnerAvailableStatus } from './test-query';

type Props = {
  status: SearchValue | null;
  forPartner: boolean;
  pushStatus: (txt: string) => () => void;
};

const StatusesSelect: React.FC<Props> = ({
  status,
  forPartner,
  pushStatus,
}) => {
  return (
    <>
      <Typography variant="subtitle2">Статус</Typography>
      <Stack direction="row" flexWrap="wrap" rowGap={1} gap={1}>
        {(forPartner ? partnerAvailableStatus : taskStatus).map((st) => {
          return (
            <ButtonBase key={st.value} onClick={pushStatus(st.plural)}>
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
    </>
  );
};

export default StatusesSelect;
