import { Typography, Box, Stack } from '@mui/material';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { taskStatus } from '../../../data/task-status';
import { DetailedTask } from '../../../pages/api/tasks/[taskId]';
import OutlinedCard from '../../common/cards/outline-card';
import LabelAndData from '../../common/data-presentation/label-and-data';
import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';
import { taskBasicCategoryValues } from '../../../data/task-basic-category';
import React from 'react';
import { bigIntToNum } from '../../../utility/bigIntToNum';

type Props = {
  events: DetailedTask['taskEvents'];
};

const AdminTaskEvents: React.FC<Props> = ({ events }) => {
  return (
    <Stack spacing={2} sx={{ minWidth: '50%' }}>
      {events.length === 0 && (
        <Typography variant="h6">Все още няма събития</Typography>
      )}
      {events.map((event) => (
        <OutlinedCard key={event.id}>
          <Typography variant="body2">
            {new Intl.DateTimeFormat('bg', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }).format(new Date(bigIntToNum(event.createdAt)))}
          </Typography>
          <Typography variant="body1">
            <PrimaryDarkText>
              {event.whoTriggeredIt === 'ADMIN'
                ? `${event.adminTriggered?.puserData.name} (админ)`
                : `${event.partnerTriggered?.firmName} (партньор)`}
            </PrimaryDarkText>
          </Typography>

          <LabelAndData label="Промени">
            <Stack spacing={1}>
              {(!!event.statusFrom || !!event.statusTo) && (
                <Change
                  label="Статус"
                  from={
                    taskStatus.find((s) => s.value === event.statusFrom)
                      ?.caption || 'Непосочен'
                  }
                  to={
                    taskStatus.find((s) => s.value === event.statusTo)
                      ?.caption || 'Непосочен'
                  }
                />
              )}

              {(!!event.taskBasicCategoryFrom ||
                !!event.taskBasicCategoryTo) && (
                <Change
                  label="Категория"
                  from={
                    taskBasicCategoryValues.find(
                      (c) => c.value === event.taskBasicCategoryFrom
                    )?.caption || 'Непосоченa'
                  }
                  to={
                    taskBasicCategoryValues.find(
                      (c) => c.value === event.taskBasicCategoryTo
                    )?.caption || 'Непосоченa'
                  }
                />
              )}

              {(!!event.partnerDescriptionFrom ||
                !!event.partnerDescriptionTo) && (
                <Change
                  label="Партньорско описание"
                  from={event.partnerDescriptionFrom || 'Празно поле'}
                  to={event.partnerDescriptionTo || 'Празно поле'}
                />
              )}

              {(!!event.partnerRequestFrom || !!event.partnerRequestTo) && (
                <Change
                  label="Партньорско запитване"
                  from={event.partnerRequestFrom || 'Празно поле'}
                  to={event.partnerRequestTo || 'Празно поле'}
                />
              )}

              {(!!event.partnerFrom || !!event.partnerTo) && (
                <Change
                  label="Смяна на партньора"
                  from={
                    event.partnerFrom ? event.partnerFrom.firmName : 'Непосочен'
                  }
                  to={event.partnerTo ? event.partnerTo.firmName : 'Непосочен'}
                />
              )}
            </Stack>
          </LabelAndData>
        </OutlinedCard>
      ))}
    </Stack>
  );
};

export default AdminTaskEvents;

const Change = ({
  label,
  from,
  to,
}: {
  label: string;
  from: string;
  to: string;
}) => {
  return (
    <>
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        <PrimaryDarkText>{label}</PrimaryDarkText>
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ width: '100%', mt: `0 !important` }}
      >
        <Typography variant="body2" sx={{ flex: 1, textAlign: 'right' }}>
          {from.split('\n').map((txt, i) => (
            <React.Fragment key={i}>
              {txt}
              <br />
            </React.Fragment>
          ))}
        </Typography>
        <ArrowRightAltOutlinedIcon />
        <Typography variant="body2" sx={{ flex: 1 }}>
          {to.split('\n').map((txt, i) => (
            <React.Fragment key={i}>
              {txt}
              <br />
            </React.Fragment>
          ))}
        </Typography>
      </Stack>
    </>
  );
};
