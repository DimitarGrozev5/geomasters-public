import { Box } from '@mui/material';
import { ClientMessageType } from '../../../../pages/api/clients/[clientId]';
import InitMessage from './init-message';
import MsgBox from './message-box';
import TaskMessage from './task-message';

type Props = { msg: ClientMessageType };

export const ClientMessage: React.FC<Props> = ({ msg }) => {
  if (msg.task) {
    return (
      <MsgBox>
        <TaskMessage task={msg.task} />
      </MsgBox>
    );
  }
  if (msg.initialMessage && !msg.task) {
    return (
      <MsgBox>
        <InitMessage initMsg={msg.initialMessage} />
      </MsgBox>
    );
  }
  return <></>;
};

export default ClientMessage;
