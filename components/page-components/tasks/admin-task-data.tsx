import { useMemo, useState } from 'react';

import {
  Stack,
  Tooltip,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Modal from '../../layouts/main-layout/modal/modal';
import Spacer from '../../common/data-presentation/spacer';
import Confirm from '../../common/inputs/confirm-button';
import FilledCard from '../../common/cards/filled-card';
import LabelAndData from '../../common/data-presentation/label-and-data';
import EditableData from '../../common/inputs/editable-fields/editable-data';
import SetClientForm from './set-client-form';
import TaskEkatteForm from './ekatte-form';
import ClientOverview from '../../common/actor-overview-cards/client-overview';
import SetPartnerForm from './set-partner-form';
import { taskStatus } from '../../../data/task-status';
import { Controller } from 'react-hook-form';
import PartnerOverview from '../../common/actor-overview-cards/partner-overview';
import TaskStatusSelect from '../../common/inputs/task-status-select';
import { DetailedTask } from '../../../pages/api/tasks/[taskId]';
import { ekatte, oblasti } from '../../../data/ekatte';
import TaskBasicCategorySelect from '../../common/inputs/task-basic-category-select';
import { useConfiguredMutation } from '../../data-fetching/use-mutation';
import { taskBasicCategoryValues } from '../../../data/task-basic-category';
import { bigIntToNum } from '../../../utility/bigIntToNum';

type Props = {
  task: DetailedTask;
};

const AdminTaskData: React.FC<Props> = ({
  task: {
    id,
    createdAt,
    ekatte: taskEkatte,
    description,
    partnerDescription,
    forClient,
    partner,
    status,
    taskBasicCategory,
    partnerRequest,
  },
}) => {
  const [showEkatteForm, setShowEkatteForm] = useState(false);
  const [showClientSeachForm, setShowClientSeachForm] = useState(false);
  const [showPartnerSeachForm, setShowPartnerSeachForm] = useState(false);

  const settlement = useMemo(
    () => ekatte.find((e) => e.ekatte === taskEkatte),
    [taskEkatte]
  );
  const oblast = useMemo(
    () => oblasti.find((b) => b.id === settlement?.oblast),
    [settlement?.oblast]
  );

  const { isLoading: delClientIsLoading, mutate: deleteClient } =
    useConfiguredMutation(
      `/api/tasks/${id}/forClient`,
      { method: 'DELETE' },
      ['admin', 'tasks', id],
      {}
    );
  const { isLoading: delPartnerIsLoading, mutate: deletePartner } =
    useConfiguredMutation(
      `/api/tasks/${id}/partner`,
      { method: 'DELETE' },
      ['admin', 'tasks', id],
      {}
    );

  const lw = 20;

  return (
    <>
      <Spacer gap={2} />
      <LabelAndData label="Създадена на" labelWidth={lw}>
        {new Intl.DateTimeFormat('bg').format(
          new Date(bigIntToNum(createdAt))
        )}
      </LabelAndData>

      <LabelAndData label="За" labelWidth={lw}>
        {settlement?.label}, обл.{oblast?.label}, {taskEkatte}{' '}
        <Tooltip title="Редактирай">
          <IconButton onClick={() => setShowEkatteForm(true)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </LabelAndData>
      <Modal
        show={showEkatteForm}
        closeHandler={() => setShowEkatteForm(false)}
      >
        <TaskEkatteForm
          taskId={id}
          selectedEkatte={taskEkatte}
          invalidates={['admin', 'tasks']}
          onClose={() => setShowEkatteForm(false)}
        />
      </Modal>

      <LabelAndData label="Описание" labelWidth={lw}>
        <EditableData
          data={description}
          url={`/api/tasks/${id}/description`}
          invalidates={['admin', 'tasks', id]}
          inputComponent={<TextField multiline rows={6} />}
        />
      </LabelAndData>
      <LabelAndData label="Партньорско описание" labelWidth={lw}>
        <EditableData
          data={partnerDescription}
          url={`/api/tasks/${id}/partnerDescription`}
          invalidates={['admin', 'tasks', id]}
          inputComponent={<TextField multiline rows={6} />}
        />
      </LabelAndData>

      <LabelAndData label="За клиент" labelWidth={lw}>
        <Stack direction="row" alignItems="center">
          {!!forClient ? (
            <FilledCard navigate={`/admin/clients/${forClient.id}`}>
              <ClientOverview client={forClient} />
            </FilledCard>
          ) : (
            <Typography
              sx={{
                color: (theme) => theme.palette.error.main,
                fontStyle: 'italic',
              }}
            >
              Не е избран клиент!
            </Typography>
          )}
          <Tooltip title="Редактирай">
            <IconButton onClick={() => setShowClientSeachForm(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          {!!forClient && (
            <Confirm
              onClick={() => deleteClient(undefined)}
              hardWord={forClient.name}
              label="Премахвате клиента от тази задача. Действието не може да се отмени и ако е грешка, ще трябва да го добавите наново"
            >
              <Tooltip title="Изтрий">
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Confirm>
          )}
        </Stack>
        <Modal
          show={showClientSeachForm}
          closeHandler={() => setShowClientSeachForm(false)}
        >
          <SetClientForm
            taskId={id}
            clientId={forClient?.id}
            onClose={() => setShowClientSeachForm(false)}
            invalidates={['admin', 'tasks']}
          />
        </Modal>
      </LabelAndData>

      <Spacer gap={2} />
      <LabelAndData label="При партньор" labelWidth={lw}>
        <Stack direction="row" alignItems="center">
          {!!partner ? (
            <FilledCard navigate={`/admin/partners/${partner.id}`}>
              <PartnerOverview partner={partner} />
            </FilledCard>
          ) : (
            <Typography
              sx={{
                color: (theme) => theme.palette.error.main,
                fontStyle: 'italic',
              }}
            >
              Не е избран партньор!
            </Typography>
          )}
          <Tooltip title="Редактирай">
            <IconButton onClick={() => setShowPartnerSeachForm(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          {!!partner && (
            <Confirm
              onClick={() => deletePartner(undefined)}
              hardWord={partner.firmName}
              label="Премахвате партньор от тази задача. Действието е необратимо. Подсигурете се, че сте коментирали с конкретния партньор"
            >
              <Tooltip title="Изтрий">
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Confirm>
          )}
        </Stack>
        <Modal
          show={showPartnerSeachForm}
          closeHandler={() => setShowPartnerSeachForm(false)}
        >
          <SetPartnerForm
            taskId={id}
            partnerId={partner?.id}
            onClose={() => setShowPartnerSeachForm(false)}
            invalidates={['admin', 'tasks']}
          />
        </Modal>
      </LabelAndData>

      <LabelAndData label="Статус" labelWidth={lw}>
        <EditableData
          data={status}
          displayData={(st) =>
            taskStatus.find((s) => s.value === st)?.caption || 'Неясен'
          }
          url={`/api/tasks/${id}/status`}
          invalidates={['admin', 'tasks']}
        >
          <Controller
            render={({ field: { value, onChange } }) => (
              <TaskStatusSelect value={value} onChange={onChange} />
            )}
            name={'data'}
          />
        </EditableData>
      </LabelAndData>

      <LabelAndData label="Категория" labelWidth={lw}>
        <EditableData
          data={taskBasicCategory}
          displayData={(st) =>
            taskBasicCategoryValues.find((s) => s.value === st)?.caption ||
            'Неясна'
          }
          url={`/api/tasks/${id}/taskBasicCategory`}
          invalidates={['admin', 'tasks']}
        >
          <Controller
            render={({ field: { value, onChange } }) => (
              <TaskBasicCategorySelect value={value} onChange={onChange} />
            )}
            name={'data'}
          />
        </EditableData>
      </LabelAndData>

      <LabelAndData label="Партньорско запитване" labelWidth={lw}>
        <EditableData
          data={partnerRequest}
          url={`/api/tasks/${id}/partnerRequest`}
          invalidates={['admin', 'tasks', id]}
          inputComponent={<TextField multiline rows={6} />}
        />
      </LabelAndData>
    </>
  );
};

export default AdminTaskData;
