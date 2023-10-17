import { Stack } from '@mui/material';

type Props = { right?: boolean } & React.PropsWithChildren;

const MsgBox: React.FC<Props> = ({ children, right = true }) => {
  return (
    <Stack
      sx={{
        alignSelf: right ? 'flex-end' : 'flex-start',
        textAlign: right ? 'right' : 'left',
        maxWidth: '60%',
        minWidth: '30%',

        border: (theme) => `1px solid ${theme.palette.primary.A700}`,
        borderRadius: 2,
        backgroundColor: (theme) => theme.palette.primary.A50,
        color: (theme) => theme.palette.primary.A900,

        p: 1,
      }}
    >
      {children}
    </Stack>
  );
};

export default MsgBox;
