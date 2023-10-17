import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useMemo } from 'react';
import { ClientMessageType } from '../../../pages/api/clients/[clientId]';
import { bigIntToNum } from '../../../utility/bigIntToNum';
import ClientMessage from './messages/message';

type Props = {
  clientId: number;
  name: string;
  messages: ClientMessageType[];
};

const ClientMessages: React.FC<Props> = ({ clientId, name, messages }) => {
  const sortedMsg = useMemo(
    () =>
      [...messages].sort((a, b) => {
        const d2 = new Date(bigIntToNum(b.createdAt)).getTime();
        const d1 = new Date(bigIntToNum(a.createdAt)).getTime();
        return d1 - d2;
      }),
    [messages]
  );
  return (
    <Stack
      sx={{
        flex: 1,
        alignSelf: 'stretch',
        maxHeight: '70vh',
        overflowY: 'auto',
        gap: 1,
        p: 1,
      }}
    >
      {sortedMsg.map((msg) => (
        <ClientMessage key={msg.id} msg={msg} />
      ))}
    </Stack>
  );
};

export default ClientMessages;
