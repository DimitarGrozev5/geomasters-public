import { Switch, styled, alpha, lighten } from '@mui/material';

import viberImg from '../../../public/images/icons/viber.png';

const ViberSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      color: lighten(theme.palette.viber.main, 0.9),
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('${viberImg.src}')`,
      },
      '& + .MuiSwitch-track': {
        backgroundColor: lighten(theme.palette.viber.main, 0.5),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    position: 'relative',
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
    },
  },
}));

export default ViberSwitch;
