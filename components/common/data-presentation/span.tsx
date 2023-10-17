import { Box } from '@mui/material';

type Props = React.ComponentProps<typeof Box>;

const Span: React.FC<Props> = ({ children, component, ...props }) => {
  return (
    <Box component="span" {...props}>
      {children}
    </Box>
  );
};

export default Span;
