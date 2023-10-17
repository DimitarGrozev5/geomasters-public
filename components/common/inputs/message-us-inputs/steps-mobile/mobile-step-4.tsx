import { Box, Button, FormLabel, Stack } from '@mui/material';
import SelectCommunication from '../select-communication';

type Props = {};

const MobileFourthStep: React.FC<Props> = () => {
  return (
    <Stack gap={2} sx={{ width: '100%' }}>
      <FormLabel
        id="demo-radio-buttons-group-label"
        sx={{ alignSelf: 'center' }}
      >
        Как предпочитате да се свържем с вас?
      </FormLabel>
      <SelectCommunication
        labels={{
          phone: 'По телефон',
          email: 'По имейл',
          viber: 'По Viber',
        }}
        disabledLabels={{
          email: '(Не сте въвели имейл)',
          viber: '(Не сте маркирали, че имате вайбър)',
        }}
      />

      {/* <Box
        sx={{
          width: '100%',
          height: 150,
          border: '1px solid black',
          textAlign: 'center',
        }}
      >
        Място за Google ReCaptcha, за да не реши някой пишман хакер да ни залива
        със спам заявки
      </Box> */}
    </Stack>
  );
};

export default MobileFourthStep;
