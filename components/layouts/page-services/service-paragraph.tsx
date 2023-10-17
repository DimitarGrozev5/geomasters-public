import { Box, Typography as Ty } from '@mui/material';

type Props = {
  title: React.ReactNode;
  content: React.ReactNode;
};

const ServiceParagraph: React.FC<Props> = ({ title, content }) => {
  return (
    <>
      <Ty
        variant="h4"
        component="h2"
        sx={{
          color: (theme) => theme.palette.primary.A900,
          backgroundColor: (theme) => theme.palette.primary.A50,
          p: 2,
          pl: 4,
          pr: 4,
          borderRadius: (theme) => theme.spacing(4),
          fontWeight: 600,
        }}
      >
        {title}
      </Ty>
      <Box sx={{ pt: 8, pl: 4, pb: 14 }}>{content}</Box>
    </>
  );
};

export default ServiceParagraph;
