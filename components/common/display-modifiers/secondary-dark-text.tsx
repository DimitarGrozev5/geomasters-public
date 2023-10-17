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

const SecondaryDarkText: React.FC<Props> = ({
  children,
  colorVariant = 'A800',
}) => {
  return (
    <Span sx={{ color: (theme) => theme.palette.secondary[colorVariant] }}>
      {children}
    </Span>
  );
};

export default SecondaryDarkText;
