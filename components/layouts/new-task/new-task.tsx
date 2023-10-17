import {
  Backdrop,
  Button,
  Fade,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

type Props = {
  show: boolean;
  closeHandler: () => void;
};

const NewTask: React.FC<Props> = ({ show, closeHandler }) => {
  return (
    <>
      <Backdrop
        open={show}
        onClick={closeHandler}
        sx={{
          zIndex: (theme) => theme.zIndex.fab + 1,
        }}
      />
      <Fade in={show}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: (theme) => theme.zIndex.fab + 2,
          }}
        >
          <Paper sx={{ padding: 2, width: '50%' }}>
            <FormGroup>
              <Stack gap={1}>
                <Typography variant="h6">Създаване на нова задача</Typography>
                <TextField label="Име" />
                <TextField label="Телефон" />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Има Viber на този телефон"
                />
                <TextField label="Емейл" />
                <TextField label="Описание на задачата" multiline rows={5} />
                <Stack direction="row" gap={1}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Област
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Област"
                    >
                      <MenuItem value={10}>Варна</MenuItem>
                      <MenuItem value={20}>Бургас</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-1">
                      Община
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-1"
                      id="demo-simple-select"
                      label="Община"
                    >
                      <MenuItem value={10}>Варна</MenuItem>
                      <MenuItem value={20}>Аксаково</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-2">
                      Населено място
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-2"
                      id="demo-simple-select"
                      label="Населено място"
                    >
                      <MenuItem value={10}>Аксаково</MenuItem>
                      <MenuItem value={20}>Игнатиево</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                <FormLabel id="demo-radio-buttons-group-label">
                  Как предпочита да комуникира?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="phone"
                    control={<Radio />}
                    label="По телефон"
                  />
                  <FormControlLabel
                    value="message"
                    control={<Radio />}
                    label="Емейл и Viber"
                  />
                </RadioGroup>

                <Stack direction="row" justifyContent="space-around">
                  <Button onClick={closeHandler}>Отказ</Button>
                  <Button>Запзване</Button>
                </Stack>
              </Stack>
            </FormGroup>
          </Paper>
        </Stack>
      </Fade>
    </>
  );
};

export default NewTask;
