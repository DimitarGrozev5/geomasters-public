import { Stack } from '@mui/material';

type Props = {
  flex: number;
} & React.PropsWithChildren;

const VerticalContainer: React.FC<Props> = ({ children, flex }) => {
  return (
    <Stack spacing={4} sx={{ flex }}>
      {children}
    </Stack>
  );
};

export default VerticalContainer;
