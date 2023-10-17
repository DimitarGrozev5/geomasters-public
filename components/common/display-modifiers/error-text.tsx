import Span from '../data-presentation/span';

type Props = {
  children: string | string[];
};

const ErrorText: React.FC<Props> = ({ children }) => {
  return (
    <Span
      sx={{ color: (theme) => theme.palette.error.main, fontStyle: 'italic' }}
    >
      {children}
    </Span>
  );
};

export default ErrorText;
