import { useMemo } from 'react';

import { Box, Typography, Button } from '@mui/material';

import Spacer from '../../common/data-presentation/spacer';
import FilledCard from '../../common/cards/filled-card';
import LabelAndData from '../../common/data-presentation/label-and-data';
import ClientOverview from '../../common/actor-overview-cards/client-overview';
import { taskStatus } from '../../../data/task-status';
import { PersonalTask } from '../../../pages/api/tasks/[taskId]';
import { ekatte, oblasti } from '../../../data/ekatte';
import { taskBasicCategoryValues } from '../../../data/task-basic-category';
import ErrorText from '../../common/display-modifiers/error-text';
import { useConfiguredMutation } from '../../data-fetching/use-mutation';
import { TaskStatus } from '@prisma/client';
import Confirm from '../../common/inputs/confirm-button';
import { bigIntToNum } from '../../../utility/bigIntToNum';

type Props = {
  task: PersonalTask;
};

const PartnerTaskData: React.FC<Props> = ({
  task: {
    id,
    createdAt,
    ekatte: taskEkatte,
    description,
    partnerDescription,
    forClient,
    status,
    taskBasicCategory,
    partnerRequest,
  },
}) => {
  const settlement = useMemo(
    () => ekatte.find((e) => e.ekatte === taskEkatte),
    [taskEkatte]
  );
  const oblast = useMemo(
    () => oblasti.find((b) => b.id === settlement?.oblast),
    [settlement?.oblast]
  );

  const lw = 20;

  const { mutate: changeStatusTo } = useConfiguredMutation(
    `/api/tasks/${id}/status`,
    { method: 'PATCH' },
    ['partner', 'tasks'],
    {}
  );
  const { mutate: cantContact } = useConfiguredMutation(
    `/api/tasks/${id}/userCantBeContacted`,
    { method: 'PATCH' },
    ['partner', 'tasks'],
    {}
  );
  const { mutate: contacted } = useConfiguredMutation(
    `/api/tasks/${id}/userIsContacted`,
    { method: 'PATCH' },
    ['partner', 'tasks'],
    {}
  );

  return (
    <>
      <Spacer gap={2} />
      <LabelAndData label="Създадена на" labelWidth={lw}>
        {new Intl.DateTimeFormat('bg').format(new Date(bigIntToNum(createdAt)))}
      </LabelAndData>

      <LabelAndData label="За" labelWidth={lw}>
        {settlement?.label}, обл.{oblast?.label}, {taskEkatte}{' '}
      </LabelAndData>

      <LabelAndData label="Описание" labelWidth={lw}>
        {description}
      </LabelAndData>
      <LabelAndData label="Партньорско описание" labelWidth={lw}>
        {partnerDescription}
      </LabelAndData>

      <LabelAndData label="За клиент" labelWidth={lw}>
        {!!forClient ? (
          <FilledCard navigate={`/admin/clients/${forClient.id}`}>
            <ClientOverview client={forClient} />
          </FilledCard>
        ) : (
          <Typography variant="body1">
            <ErrorText>
              Приемете задачата, за да видите данни за клиента
            </ErrorText>
          </Typography>
        )}
      </LabelAndData>

      <LabelAndData label="Статус" labelWidth={lw}>
        {taskStatus.find((s) => s.value === status)?.caption || 'Неясен'}
      </LabelAndData>

      <LabelAndData label="Категория" labelWidth={lw}>
        {taskBasicCategoryValues.find((s) => s.value === taskBasicCategory)
          ?.caption || 'Неясна'}
      </LabelAndData>

      <LabelAndData label="Партньорско запитване" labelWidth={lw}>
        {partnerRequest}
      </LabelAndData>

      <Box>
        {status === 'OFFERED' && (
          <>
            <Confirm
              onClick={() => changeStatusTo({ data: TaskStatus.ACCEPTED })}
              label="Ще бъдат изтеглени пари от профила Ви"
            >
              <Button>Приеми</Button>
            </Confirm>
            <Confirm
              onClick={() => changeStatusTo({ data: TaskStatus.REJECTED })}
              label="Сигурни ли сте, че отказвате?"
            >
              <Button>Откажи</Button>
            </Confirm>
          </>
        )}

        {status === 'ACCEPTED' && (
          <>
            <Confirm
              onClick={() =>
                changeStatusTo({ data: TaskStatus.CLIENT_REJECTED })
              }
              label="Сигурни ли сте?"
            >
              <Button>Клиентът се отказа</Button>
            </Confirm>
            <Confirm
              onClick={() => changeStatusTo({ data: TaskStatus.STARTED })}
              label="Сигурни ли сте?"
            >
              <Button>Започвам задача</Button>
            </Confirm>
          </>
        )}

        {status === 'STARTED' && (
          <>
            <Confirm
              onClick={() => changeStatusTo({ data: TaskStatus.FINISHED })}
              label="Сигурни ли сте?"
            >
              <Button>Завърших задачата</Button>
            </Confirm>
            <Confirm
              onClick={() => changeStatusTo({ data: TaskStatus.IMPOSSIBLE })}
              label="Сигурни ли сте?"
            >
              <Button>Задачата не може да се завърши</Button>
            </Confirm>
            <Confirm
              onClick={() =>
                changeStatusTo({ data: TaskStatus.UNABLE_TO_FINISH })
              }
              label="Сигурни ли сте? Задачата ще бъде премахната от списъка Ви и ще бъде предложена на друг,"
            >
              <Button>Не мога да завърша задачата</Button>
            </Confirm>
          </>
        )}
      </Box>
    </>
  );
};

export default PartnerTaskData;
