import { Box, CircularProgress, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { DetailedPartner } from '../../../../pages/api/partners/[partnerId]';
import { useConfiguredMutation } from '../../../data-fetching/use-mutation';
import DistanceSlider from './distance-slider';

type Props = { partner: DetailedPartner };

const DistancesSliders: React.FC<Props> = ({ partner }) => {
  const { isLoading: loading1, mutate: mutateRegularTravel } =
    useConfiguredMutation(
      `/api/partners/${partner.id}/willingToRegularlyTravelUpTo`,
      { method: 'PATCH' },
      ['partner', partner.id],
      { alertOnSuccess: { message: 'Запазено' } }
    );
  const { isLoading: loading2, mutate: mutateExtraTravel } =
    useConfiguredMutation(
      `/api/partners/${partner.id}/willingToTravelUpTo`,
      { method: 'PATCH' },
      ['partner', partner.id],
      { alertOnSuccess: { message: 'Запазено' } }
    );

  const [regularTravel, setRegularTravel] = useState(
    partner.willingToRegularlyTravelUpTo
  );
  const [extraTravel, setExtraTravel] = useState(partner.willingToTravelUpTo);

  useEffect(() => {
    setRegularTravel(partner.willingToRegularlyTravelUpTo);
    setExtraTravel(partner.willingToTravelUpTo);
  }, [partner.willingToRegularlyTravelUpTo, partner.willingToTravelUpTo]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (regularTravel !== partner.willingToRegularlyTravelUpTo) {
      timeout = setTimeout(async () => {
        mutateRegularTravel({ data: regularTravel });
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [
    mutateRegularTravel,
    partner.willingToRegularlyTravelUpTo,
    regularTravel,
  ]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (extraTravel !== partner.willingToTravelUpTo) {
      timeout = setTimeout(async () => {
        mutateExtraTravel({ data: extraTravel });
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [mutateExtraTravel, extraTravel, partner.willingToTravelUpTo]);

  const handleRegularChange = (time: number) => {
    // Keep value between bounds
    if (time < 30 || time > 8 * 60 - 30) {
      return;
    }
    // Make sure extra is at least 30 minutes greather than regular
    if (extraTravel - time < 30) {
      setExtraTravel(time + 30);
    }
    setRegularTravel(time);
  };

  const handleExtraChange = (time: number) => {
    // Keep value between bounds
    if (time < 60 || time > 8 * 60) {
      return;
    } // Make sure regular is at least 30 minutes lesser than extra
    if (time - regularTravel < 30) {
      setRegularTravel(time - 30);
    }
    setExtraTravel(time);
  };

  return (
    <Stack spacing={2} sx={{ position: 'relative' }}>
      <DistanceSlider
        label="Приемам редовни пътувания до:"
        value={regularTravel}
        onChange={handleRegularChange}
      />
      <DistanceSlider
        label="Приемам извънредни пътувания до:"
        value={extraTravel}
        onChange={handleExtraChange}
      />
      {(loading1 || loading2) && (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: (theme) => theme.zIndex.modal - 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: '#ffffff33',
              backdropFilter: 'blur(2px)',
            }}
          />
          <CircularProgress />
        </Box>
      )}
    </Stack>
  );
};

export default DistancesSliders;
