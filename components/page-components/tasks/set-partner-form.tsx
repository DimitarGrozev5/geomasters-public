import { LoadingButton } from '@mui/lab';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { QueryKey } from 'react-query';
import { ID } from '../../../model/id.type';
import ClientOverview from '../../common/actor-overview-cards/client-overview';
import PartnerOverview from '../../common/actor-overview-cards/partner-overview';
import FilledCard from '../../common/cards/filled-card';
import LabelAndData from '../../common/data-presentation/label-and-data';
import ErrorText from '../../common/display-modifiers/error-text';
import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';
import FindClient from '../../common/inputs/find-client';
import FindPartner from '../../common/inputs/find-partner';
import { useConfiguredMutation } from '../../data-fetching/use-mutation';

type Props = {
  taskId: ID;
  partnerId?: ID;
  onClose: () => void;
  invalidates?: QueryKey | undefined;
};

const SetPartnerForm: React.FC<Props> = ({
  taskId,
  partnerId,
  onClose,
  invalidates,
}) => {
  const [selectedPartnerId, setSelectedPartnerId] = useState<ID | null>(
    partnerId || null
  );

  const { isLoading, mutate } = useConfiguredMutation(
    `/api/tasks/${taskId}/partner`,
    { method: 'PATCH' },
    invalidates,
    {
      alertOnSuccess: { message: 'Успещо променен партньор' },
      onSuccess: onClose,
    }
  );

  return (
    <Stack spacing={2}>
      <Typography variant="h5">
        <PrimaryDarkText>Изберете партньор</PrimaryDarkText>
      </Typography>

      <LabelAndData label="Текущ избор">
        {selectedPartnerId ? (
          <FilledCard>
            <PartnerOverview partnerId={selectedPartnerId} />
          </FilledCard>
        ) : (
          <Typography variant="body1">
            <ErrorText>Не е избран партньор</ErrorText>
          </Typography>
        )}
      </LabelAndData>

      <Stack spacing={1} justifyContent="center">
        <FindPartner
          value={selectedPartnerId}
          onChange={setSelectedPartnerId}
        />
      </Stack>

      <Stack justifyContent="space-around" direction="row">
        <Button onClick={onClose}>Отказ</Button>
        <LoadingButton
          loading={isLoading}
          onClick={() => mutate({ data: selectedPartnerId })}
        >
          Запази
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default SetPartnerForm;
