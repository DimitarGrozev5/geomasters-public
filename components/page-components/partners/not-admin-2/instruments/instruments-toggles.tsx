import { styled, Switch } from '@mui/material';

export const InstrumentSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.primary.A400,
        border: '1px solid black',
        borderColor: theme.palette.primary.A600,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.A200,
        border: '1px solid black',
        borderColor: theme.palette.primary.A300,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.alternative.A200,
    border: '1px solid black',
    borderColor: theme.palette.alternative.A400,
    filter: 'drop-shadow(0 0 0.75rem #00000011)',
    '&:before': {
      // content: "''",
      // position: 'absolute',
      // width: '100%',
      // height: '100%',
      // left: 0,
      // top: 0,
      // borderRadius: 20 / 2,
      // backgroundRepeat: 'no-repeat',
      // backgroundPosition: 'center',
      // backgroundImage: `url('${gnssImg.src}')`,
      // backgroundSize: 'contain',
      // filter: 'grayscale(100%)',
    },
  },
  '& .MuiSwitch-track': {
    // opacity: 1,
    backgroundColor: theme.palette.alternative.A500,
    border: '1px solid black',
    borderColor: theme.palette.alternative.A600,
    // borderRadius: 20 / 2,
  },
}));
