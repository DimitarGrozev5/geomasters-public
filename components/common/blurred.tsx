import { Box } from '@mui/material';
import React from 'react';

type Props = {
  children: string;
};

const Blurred: React.FC<Props> = ({ children }) => {
  const scrambledString = children
    .split('')
    .map((c) => {
      if (c === ' ') {
        return c;
      }
      if (c.toLocaleLowerCase() === c) {
        return 'x';
      }
      return 'X';
    })
    .join('');
  return (
    <Box sx={{ position: 'relative' }}>
      {scrambledString}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backdropFilter: 'blur(4px)',
        }}
      ></Box>
    </Box>
  );
};

export default Blurred;
