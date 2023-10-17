import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { NewMessage } from '../../../../pages/api/messages/new';
import LabelAndData from '../../../common/data-presentation/label-and-data';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';
import NewTaskModal from '../modal-new-task';

type Props = { msg: NewMessage };

const MessageTaskOverview: React.FC<Props> = ({ msg }) => {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  return (
    <>
      {!!msg.task ? (
        <>
          <Typography variant="h6">
            <PrimaryDarkText>
              Има закачена задача към това съобщение
            </PrimaryDarkText>
          </Typography>
          <Button component={Link} href={`/admin/tasks/${msg.task.id}`}>
            Към задачата
          </Button>
        </>
      ) : (
        <Button onClick={() => setShowNewTaskModal(true)}>
          Направи задача
        </Button>
      )}
      {msg.ownerClient && (
        <NewTaskModal
          show={showNewTaskModal}
          onClose={() => setShowNewTaskModal(false)}
          invalidates={['admin', 'messages', 'new']}
          messageId={msg.id}
          client={msg.ownerClient}
          userDescription={msg.problemDescription}
          ekatteString={msg.ekatte}
        />
      )}
    </>
  );
};

export default MessageTaskOverview;
