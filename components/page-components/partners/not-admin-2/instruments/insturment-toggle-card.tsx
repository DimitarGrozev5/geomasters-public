import { Box, Card, CardActionArea } from '@mui/material';

import { StaticImageData } from 'next/image';

import BgImage from '../../../../common/helper/background-image';

import tsImg from '../../../../../public/images/icons/total-station.webp';
import levelImg from '../../../../../public/images/icons/level-icon.png';
import gnssImg from '../../../../../public/images/icons/gnss-icon.webp';
import droneImg from '../../../../../public/images/icons/dron-icon.png';
import { InstrumentSwitch } from './instruments-toggles';

type Props = { img: StaticImageData } & React.ComponentProps<
  typeof InstrumentSwitch
>;

const w = 20;

const ToggleCard: React.FC<Props> = ({ img, checked, ...switchProps }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        position: 'relative',

        backgroundColor: (theme) =>
          checked ? theme.palette.primary.A100 : theme.palette.alternative.A100,
        border: '1px solid black',
        borderColor: (theme) =>
          checked ? theme.palette.primary.A200 : theme.palette.alternative.A200,
        borderRadius: 5,
      }}
    >
      <CardActionArea
        sx={{
          position: 'relative',

          width: (theme) => theme.spacing(w),
          height: (theme) => theme.spacing(w),

          p: 3,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: (theme) => theme.spacing(2),
            bottom: (theme) => theme.spacing(2),
            left: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
            filter: checked ? undefined : 'grayscale(100%) contrast(70%)',
          }}
        >
          <BgImage
            srcImg={img}
            sizes={{
              xs: '100%',
              sm: '100%',
              md: '100%',
              lg: '100%',
              xl: '100%',
            }}
            objectFit="contain"
          />
        </Box>
        <Box sx={{ position: 'absolute', right: 1, top: 1 }}>
          <InstrumentSwitch checked={checked} {...switchProps} />
        </Box>
      </CardActionArea>
    </Card>
  );
};

export const TSCardSwitch: React.FC<
  React.ComponentProps<typeof InstrumentSwitch>
> = (props) => <ToggleCard img={tsImg} {...props} />;

export const GNSSCardSwitch: React.FC<
  React.ComponentProps<typeof InstrumentSwitch>
> = (props) => <ToggleCard img={gnssImg} {...props} />;

export const LevelCardSwitch: React.FC<
  React.ComponentProps<typeof InstrumentSwitch>
> = (props) => <ToggleCard img={levelImg} {...props} />;

export const DroneCardSwitch: React.FC<
  React.ComponentProps<typeof InstrumentSwitch>
> = (props) => <ToggleCard img={droneImg} {...props} />;
