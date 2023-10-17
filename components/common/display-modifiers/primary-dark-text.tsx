import { Palette } from '@mui/material';
import Span from '../data-presentation/span';

type ColorVariant =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

type Props = {
  colorVariant?: `A${ColorVariant}`;
  children: string | string[];
};

const PrimaryDarkText: React.FC<Props> = ({
  colorVariant = 'A800',
  children,
}) => {
  return (
    <Span sx={{ color: (theme) => theme.palette.primary[colorVariant] }}>
      {children}
    </Span>
  );
};

export default PrimaryDarkText;
