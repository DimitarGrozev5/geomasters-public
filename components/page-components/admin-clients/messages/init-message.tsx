import { Alert, Box, Typography } from '@mui/material';
import { ekatte, oblasti } from '../../../../data/ekatte';
import { ClientMessageType } from '../../../../pages/api/clients/[clientId]';
import { bigIntToNum } from '../../../../utility/bigIntToNum';

type Props = {
  initMsg: NonNullable<ClientMessageType['initialMessage']>;
};

const InitMessage: React.FC<Props> = ({ initMsg }) => {
  const date = new Intl.DateTimeFormat('bg').format(
    new Date(bigIntToNum(initMsg.createdAt))
  );
  const settlement = ekatte.find((e) => e.ekatte === initMsg.ekatte);
  const oblast = oblasti.find((ob) => ob.id === settlement?.oblast);
  return (
    <>
      {/**
       * TODO: Move date and source to separate component
       */}
      <Typography variant="caption">От онлайн бланка</Typography>
      <Typography sx={{ mb: 1 }} variant="caption">
        {date}
      </Typography>

      <Box>
        {initMsg.administraded && (
          <Typography variant="subtitle2">Администрирано</Typography>
        )}
        {!initMsg.administraded && (
          <Alert variant="filled" severity="warning">
            Не е Администрирано
          </Alert>
        )}
        <Typography variant="body2">
          За {settlement?.label}, обл.{oblast?.label}, {initMsg.ekatte}
        </Typography>
      </Box>
      <Box>{initMsg.problemDescription}</Box>
    </>
  );
};

export default InitMessage;
