import {
  Card,
  CardActionArea,
  Typography as Ty,
  useTheme,
} from '@mui/material';
import React, { useMemo } from 'react';
import { ekatte, oblasti } from '../../../data/ekatte';
import { taskBasicCategoryValues } from '../../../data/task-basic-category';
import { taskStatus } from '../../../data/task-status';
import { GETTask } from '../../../pages/api/tasks';
import { bigIntToNum } from '../../../utility/bigIntToNum';
import LabelAndData from '../../common/data-presentation/label-and-data';
import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';
import SecondaryDarkText from '../../common/display-modifiers/secondary-dark-text';

type Props = { task: GETTask; onSelect: () => void };

const PartnerTasкCard: React.FC<Props> = ({ task, onSelect }) => {
  const settlement = useMemo(
    () => ekatte.find((e) => e.ekatte === task.ekatte),
    [task.ekatte]
  );
  const oblast = useMemo(
    () => oblasti.find((b) => b.id === settlement?.oblast),
    [settlement?.oblast]
  );

  const theme = useTheme();

  const borderColor = (() => {
    if (task.partnerRequest) {
      return theme.palette.error.dark;
    }
    switch (task.status) {
      case 'OFFERED':
        return theme.palette.secondary.A800;
      case 'ACCEPTED':
        return theme.palette.primary.A800;
      case 'STARTED':
        return theme.palette.alternative.A800;

      default:
        return 'default';
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

  const makeGray =
    task.status !== 'ACCEPTED' &&
    task.status !== 'OFFERED' &&
    task.status !== 'STARTED';

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor,
        backgroundColor,
      }}
    >
      <CardActionArea
        sx={{
          position: 'relative',
          p: 1,
          textAlign: 'right',
          filter: makeGray ? 'grayscale(100%)' : undefined,
        }}
        onClick={onSelect}
      >
        <Ty variant="h6">
          <PrimaryDarkText>
            {taskBasicCategoryValues.find(
              (s) => s.value === task.taskBasicCategory
            )?.caption || 'Неясна'}
          </PrimaryDarkText>
        </Ty>

        <Ty variant="subtitle1">
          <SecondaryDarkText>
            {settlement?.label || ''}, обл.{oblast?.label || ''}, {task.ekatte}
          </SecondaryDarkText>
        </Ty>

        <Ty variant="subtitle2" sx={{ color: borderColor }}>
          {taskStatus.find((s) => s.value === task.status)?.caption || 'Неясен'}
        </Ty>

        <Ty variant="subtitle2">
          {new Intl.DateTimeFormat('bg').format(
            new Date(bigIntToNum(task.createdAt))
          )}
        </Ty>

        <LabelAndData
          label={task.partnerDescription ? 'Коментар' : 'Описание'}
          alignTop
        >
          <Ty sx={{ textAlign: 'left' }}>
            {(task.partnerDescription || task.description)
              .split('\n')
              .map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
          </Ty>
        </LabelAndData>
      </CardActionArea>
    </Card>
  );
};

export default PartnerTasкCard;
