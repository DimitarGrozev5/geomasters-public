import React, { useState } from 'react';
import { useQuery } from 'react-query';

import {
  Typography as Ty,
  useTheme,
  Stack,
  Card,
  CardActionArea,
  TextField,
  Button,
  Tooltip,
} from '@mui/material';

import DescriptionIcon from '@mui/icons-material/Description';
import HelpIcon from '@mui/icons-material/Help';

import { taskBasicCategoryValues } from '../../../data/task-basic-category';
import { taskStatus } from '../../../data/task-status';
import { useLocationLabel } from '../../../hooks/useLocationLabel';
import { ServerError } from '../../../model/server-error';
import { PersonalTask } from '../../../pages/api/tasks/[taskId]';
import ClientOverview from '../../common/actor-overview-cards/client-overview';
import FilledCard from '../../common/cards/filled-card';
import ErrorText from '../../common/display-modifiers/error-text';
import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';
import DataDisplay from '../../data-fetching/data-display';
import { sendRequest } from '../../data-fetching/http-client';
import Confirm from '../../common/inputs/confirm-button';
import { useConfiguredMutation } from '../../data-fetching/use-mutation';
import { TaskStatus } from '@prisma/client';
import EditableData from '../../common/inputs/editable-fields/editable-data';
import Modal from '../../layouts/main-layout/modal/modal';
import PartnerSendIssueForm from './partner-send-issue-form';
import { bigIntToNum } from '../../../utility/bigIntToNum';

type Props = { taskId: number };

const PartnerTaskDetails: React.FC<Props> = ({ taskId }) => {
  const clientCtrl = useQuery(
    ['partner', 'tasks', taskId],
    sendRequest(`/api/tasks/${taskId}`, {
      method: 'GET',
      responseParser: (d: { task: PersonalTask }) => d.task,
    })
  );

  return (
    <>
      <DataDisplay
        control={clientCtrl}
        loadingComponent={<>Loading...</>}
        ErrorComponent={({ error }) => {
          const msg =
            error instanceof ServerError
              ? error.userMessage
              : 'Възникна грешка при зареждане на данните';
          return <>Грешка при зареждане на партньорските данни: {msg}</>;
        }}
        ContentComponent={TaskData}
      />
    </>
  );
};

type ActoionButtonProps = {
  primary: string;
  secondary: string;
  backgroundColor?: string;
};

function ActoionButton({
  primary,
  secondary,
  backgroundColor,
}: ActoionButtonProps) {
  return (
    <Card
      sx={{
        textAlign: 'center',
        backgroundColor: backgroundColor,
      }}
    >
      <CardActionArea sx={{ p: 1 }}>
        <Ty variant="body1" sx={{ textTransform: 'uppercase' }}>
          {primary}
        </Ty>
        <Ty variant="body2">{secondary}</Ty>
      </CardActionArea>
    </Card>
  );
}

// type ProblemButtonProps = {
//   partnerRequest: string;
//   onSendRequest: () => void;
//   onViewRequest: () => void;
// };

// function ProblemButton({
//   partnerRequest,
//   onSendRequest,
//   onViewRequest,
// }: ProblemButtonProps) {
//   if (partnerRequest) {
//     return (
//       <Button
//         sx={{
//           width: '100%',
//           color: (theme) => theme.palette.warning.main,
//         }}
//         onClick={onSendRequest}
//       >
//         Има проблем със задачата
//       </Button>
//     );
//   }
// }

function TaskData({ data: task }: { data: PersonalTask }) {
  const [showIssueModal, setShowIssueModal] = useState(false);

  const theme = useTheme();

  const borderColor = (() => {
    switch (task.status) {
      case 'OFFERED':
        return theme.palette.secondary.A800;
      case 'ACCEPTED':
        return theme.palette.primary.A800;
      case 'STARTED':
        return theme.palette.alternative.A800;

      default:
        return 'defauly';
    }
  })();
  const backgroundColor = (() => {
    switch (task.status) {
      case 'OFFERED':
        return theme.palette.secondary.A50;
      case 'ACCEPTED':
        return theme.palette.primary.A50;
      case 'STARTED':
        return theme.palette.alternative.A100;

      default:
        return 'defauly';
    }
  })();

  const locationLabel = useLocationLabel(task.ekatte);

  const { mutate: changeStatusTo } = useConfiguredMutation(
    `/api/tasks/${task.id}/status`,
    { method: 'PATCH' },
    ['partner', 'tasks'],
    {}
  );

  return (
    <>
      <Modal
        show={showIssueModal}
        closeHandler={() => setShowIssueModal(false)}
      >
        <PartnerSendIssueForm
          task={task}
          closeHandler={() => setShowIssueModal(false)}
        />
      </Modal>
      <Stack
        sx={{
          backgroundColor,
          p: 2,
          pt: 4,
          pb: 4,
        }}
        spacing={4}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          alignItems="stretch"
          spacing={{ xs: 2, md: 15 }}
        >
          <Stack
            sx={{ flex: 1 }}
            justifyContent="space-around"
            alignItems="stretch"
            spacing={2}
          >
            {task.status === 'OFFERED' && (
              <>
                <Confirm
                  onClick={() => changeStatusTo({ data: TaskStatus.ACCEPTED })}
                  label="Ще бъдат изтеглени пари от профила Ви"
                >
                  <ActoionButton
                    primary="Приеми"
                    secondary="Приемате да разгледате задачата"
                    backgroundColor={theme.palette.primary.A500}
                  />
                </Confirm>
                <Confirm
                  onClick={() => changeStatusTo({ data: TaskStatus.REJECTED })}
                  label="Сигурни ли сте, че отказвате?"
                >
                  <ActoionButton
                    primary="Откажи"
                    secondary="Отказвате да разгледате задачата"
                    backgroundColor={theme.palette.secondary.A100}
                  />
                </Confirm>
              </>
            )}

            {task.status === 'ACCEPTED' && (
              <>
                <Confirm
                  onClick={() => changeStatusTo({ data: TaskStatus.STARTED })}
                  label="Сигурни ли сте?"
                >
                  <ActoionButton
                    primary="Задачата е започната"
                    secondary="Свързали сте се с клиента и започвате работа по задачата"
                    backgroundColor={theme.palette.alternative.A300}
                  />
                </Confirm>
                <Confirm
                  onClick={() =>
                    changeStatusTo({ data: TaskStatus.CLIENT_REJECTED })
                  }
                  label="Сигурни ли сте?"
                >
                  <ActoionButton
                    primary="Клиентът се отказва"
                    secondary="Свързали сте се с клиента, но той се отказва от изпълнение"
                    backgroundColor={theme.palette.primary.A100}
                  />
                </Confirm>

                <Button
                  sx={{
                    width: '100%',
                    color: (theme) => theme.palette.warning.main,
                  }}
                  onClick={() => setShowIssueModal(true)}
                >
                  {task.partnerRequest
                    ? 'Променете съобщението за проблем'
                    : 'Има проблем със задачата'}
                </Button>
              </>
            )}

            {task.status === 'STARTED' && (
              <>
                <Confirm
                  onClick={() => changeStatusTo({ data: TaskStatus.FINISHED })}
                  label="Сигурни ли сте?"
                >
                  <ActoionButton
                    primary="Завършване"
                    secondary="Задачата е завършена успешно"
                    backgroundColor={theme.palette.alternative.A300}
                  />
                </Confirm>
                <Confirm
                  onClick={() =>
                    changeStatusTo({ data: TaskStatus.IMPOSSIBLE })
                  }
                  label="Сигурни ли сте?"
                >
                  <ActoionButton
                    primary="Не може да се завърши"
                    secondary="Някакво обстоятелство възпрепятства завършването на задачата"
                    backgroundColor={theme.palette.alternative.A200}
                  />
                </Confirm>

                <Button
                  sx={{
                    width: '100%',
                    color: (theme) => theme.palette.warning.main,
                  }}
                  onClick={() => setShowIssueModal(true)}
                >
                  {task.partnerRequest
                    ? 'Променете съобщението за проблем'
                    : 'Има проблем със задачата'}
                </Button>
              </>
            )}
          </Stack>

          <Stack sx={{ textAlign: 'right' }}>
            <Ty variant="h6">
              <PrimaryDarkText>
                {taskBasicCategoryValues.find(
                  (s) => s.value === task.taskBasicCategory
                )?.caption || 'Неясна'}
              </PrimaryDarkText>
            </Ty>

            <Ty variant="subtitle1">
              <PrimaryDarkText>{locationLabel}</PrimaryDarkText>
            </Ty>

            <Ty variant="subtitle2" sx={{ color: borderColor }}>
              {taskStatus.find((s) => s.value === task.status)?.caption ||
                'Неясен'}
            </Ty>

            <Ty variant="subtitle2">
              {new Intl.DateTimeFormat('bg').format(
                new Date(bigIntToNum(task.createdAt))
              )}
            </Ty>

            {!!task.forClient ? (
              <FilledCard
                // navigate={`/admin/clients/${task.forClient.id}`}
                sx={{
                  width: (theme) => theme.spacing(30),
                  alignSelf: 'flex-end',
                }}
              >
                <ClientOverview client={task.forClient} />
              </FilledCard>
            ) : (
              <Ty variant="body1">
                <ErrorText>
                  Приемете задачата, за да видите данни за клиента
                </ErrorText>
              </Ty>
            )}
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="stretch">
          <Stack sx={{ flex: 1 }} alignItems="center" spacing={2}>
            <Stack alignItems="center">
              <DescriptionIcon
                sx={{
                  fontSize: '4rem',
                  color: borderColor,
                }}
              />
              <Ty variant="subtitle2">
                <PrimaryDarkText>Описание</PrimaryDarkText>
              </Ty>
            </Stack>

            <Ty>
              {task.description.split('\n').map((t, i) => (
                <React.Fragment key={i}>
                  {t}
                  <br />
                </React.Fragment>
              ))}
            </Ty>
          </Stack>

          <Stack sx={{ flex: 1 }} alignItems="center" spacing={2}>
            <Stack alignItems="center">
              <HelpIcon
                sx={{
                  fontSize: '4rem',
                  color: borderColor,
                }}
              />
              <Ty variant="subtitle2">
                <PrimaryDarkText>Коментар</PrimaryDarkText>
              </Ty>
            </Stack>

            <EditableData
              data={task.partnerDescription}
              displayData={(data) =>
                data.split('\n').map((t, i) => (
                  <React.Fragment key={i}>
                    {t}
                    <br />
                  </React.Fragment>
                ))
              }
              placeholder={
                'Може да въведете какъвто искате коментар, за да разпознавате по-лесно задачата'
              }
              url={`/api/tasks/${task.id}/partnerDescription`}
              invalidates={['partner', 'tasks']}
              successMessage="Успешно променено описание"
              inputComponent={<TextField multiline rows={7} />}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default PartnerTaskDetails;
