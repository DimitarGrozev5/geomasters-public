import { Typography as Ty } from '@mui/material';
import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';

type Props = {
  children: React.ReactNode;
};

const ServiceHeader: React.FC<Props> = ({ children }) => {
  return (
    <Ty
      component="h1"
      variant="h3"
      sx={{ textAlign: 'center', fontWeight: 500 }}
    >
      {children}
    </Ty>
  );
};

export default ServiceHeader;
