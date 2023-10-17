import React from 'react';

import { IconButton, Tooltip, Theme } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

type Props = { tooltip: string; onClick: () => void; icon: React.ReactElement };

const AddButton: React.FC<Props> = ({ tooltip, onClick, icon }) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton sx={{ position: 'relative' }} onClick={onClick}>
        {React.cloneElement(icon, {
          sx: {
            fontSize: (theme: Theme) => theme.spacing(4),
            color: (theme: Theme) => theme.palette.primary.A700,
          },
        })}
        <AddIcon
          sx={{
            position: 'absolute',
            top: -5,
            right: -5,

            fontSize: (theme) => theme.spacing(2.5),
            color: (theme) => theme.palette.primary.A700,
          }}
        />
      </IconButton>
    </Tooltip>
  );
};

export default AddButton;
