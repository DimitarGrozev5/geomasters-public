import { LoadingButton } from '@mui/lab';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { QueryKey } from 'react-query';
import { ID } from '../../../model/id.type';
import ClientOverview from '../../common/actor-overview-cards/client-overview';
import FilledCard from '../../common/cards/filled-card';
import LabelAndData from '../../common/data-presentation/label-and-data';
import ErrorText from '../../common/display-modifiers/error-text';
import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';
import FindClient from '../../common/inputs/find-client';
import { useConfiguredMutation } from '../../data-fetching/use-mutation';

type Props = {
  taskId: ID;
  clientId?: ID;
  onClose: () => void;
  invalidates?: QueryKey | undefined;
};

const SetClientForm: React.FC<Props> = ({
  taskId,
  clientId,
  onClose,
  invalidates,
}) => {
  const [selectedClientId, setSelectedClientId] = useState<ID | null>(
    clientId || null
  );

  const { isLoading, mutate } = useConfiguredMutation(
    `/api/tasks/${taskId}/forClient`,
    { method: 'PATCH' },
    invalidates,
    { alertOnSuccess: { message: 'Успещо добавен клиент' }, onSuccess: onClose }
  );

  return (
    <Stack spacing={2}>
      <Typography variant="h5">
        <PrimaryDarkText>Изберете клиент</PrimaryDarkText>
      </Typography>

      <LabelAndData label="Текущ избор">
        {selectedClientId ? (
          <FilledCard>
            <ClientOverview clientId={selectedClientId} />
          </FilledCard>
        ) : (
          <Typography variant="body1">
            <ErrorText>Не е избран клиент</ErrorText>
          </Typography>
        )}
      </LabelAndData>

      <Stack spacing={1} justifyContent="center">
        <FindClient value={selectedClientId} onChange={setSelectedClientId} />
      </Stack>

      <Stack justifyContent="space-around" direction="row">
        <Button onClick={onClose}>Отказ</Button>
        <LoadingButton
          loading={isLoading}
          onClick={() => mutate({ data: selectedClientId })}
        >
          Запази
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default SetClientForm;
