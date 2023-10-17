import { Stack, TextField, Typography } from '@mui/material';
import { SearchValue } from './search-value-type';
import Spacer from '../../data-presentation/spacer';
import AutocpmpleteElements from '../message-us-inputs/select-location/autocpmplete-elements';

type Props = {
  ekatte: SearchValue | null;
  pushEkatte: (txt: string) => void;
};

const EkatteSelect: React.FC<Props> = ({ ekatte, pushEkatte }) => {
  return (
    <>
      <Typography variant="subtitle2">Населено място</Typography>
      <Spacer gap={1} />
      <Stack direction="row" rowGap={1} gap={1} sx={{ alignSelf: 'stretch' }}>
        <AutocpmpleteElements
          onChange={() => {}}
          onBlur={() => {}}
          value={null}
          error={undefined}
          oblastLabel={'Област'}
          oblastErrorMsg={''}
          settlementLabel={'Населено място'}
          settlementErrorMsg={''}
        />
      </Stack>
    </>
  );
};

export default EkatteSelect;
