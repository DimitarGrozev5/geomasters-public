import {
  Typography,
  Box,
  Switch,
  SxProps,
  Theme,
  CircularProgress,
} from '@mui/material';
import React from 'react';
import { QueryKey } from 'react-query';
import { useConfiguredMutation } from '../../../data-fetching/use-mutation';
import Confirm from '../confirm-button';

type Props = {
  switchComponent?: React.ReactElement;
  checked: boolean;
  label: string;
  labelProps?: SxProps<Theme>;
  url: string;
  invalidates?: QueryKey;
  successMessage?: string;

  verticalStack?: boolean;
};

const EditableSwitch: React.FC<Props> = ({
  switchComponent,
  checked,
  label,
  labelProps = {},
  url,
  invalidates,
  successMessage = 'Промяната е успешна',
  verticalStack = false,
}) => {
  // Handle data submition
  const { isLoading, mutate: updateData } = useConfiguredMutation(
    url,
    { method: 'PATCH' },
    invalidates,
    {
      alertOnSuccess: { message: successMessage },
    }
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: verticalStack ? 'column' : 'row',
        position: 'relative',
      }}
    >
      <Typography sx={{ ...labelProps }}>{label}</Typography>
      <Box sx={{ position: 'relative' }}>
        <Confirm
          onClick={() => updateData({ data: !checked })}
          label="Искате ли да промените стойността?"
        >
          {switchComponent ? (
            React.cloneElement(switchComponent, { checked })
          ) : (
            <Switch checked={checked} />
          )}
        </Confirm>
        {isLoading && (
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              // backgroundColor: '#00000033',
              backdropFilter: 'blur(2px)',
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EditableSwitch;
