import { InputAdornment, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Competency } from '@prisma/client';
import { ReactElement, JSXElementConstructor, useState } from 'react';
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import { DetailedPartner } from '../../../../pages/api/partners/[partnerId]';
import LabelAndData from '../../../common/data-presentation/label-and-data';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';
import CompetencySwitch from '../../../common/inputs/competency-switch';
import EditableData from '../../../common/inputs/editable-fields/editable-data';
import EditableSwitch from '../../../common/inputs/editable-fields/editable-switch';

type Props = {
  partner: DetailedPartner;
};

type Comps = Pick<
  DetailedPartner,
  | 'competentInSurvey'
  | 'competentInLayout'
  | 'competentInCadastre'
  | 'competentInExpertise'
  | 'competentInPUP'
  | 'competentInGrading'
  | 'competentInConstructionLayout'
  | 'competentInGeneralEngineering'
  | 'competentInEvaluations'
>;

const comps: (keyof Comps)[] = [
  'competentInSurvey',
  'competentInLayout',
  'competentInCadastre',
  'competentInExpertise',
  'competentInPUP',
  'competentInGrading',
  'competentInConstructionLayout',
  'competentInGeneralEngineering',
  'competentInEvaluations',
];

const compLabels = {
  competentInSurvey: 'Заснемания',
  competentInLayout: 'Трасиране',
  competentInCadastre: 'Кадастър',
  competentInExpertise: 'Технически експертизи',
  competentInPUP: 'Изготвяне на ПУП',
  competentInGrading: 'Вертикално планиране',
  competentInConstructionLayout: 'Строително трасиране',
  competentInGeneralEngineering: 'Инженерна геодезия',
  competentInEvaluations: 'Оценки',
};

const AdminPartnerSettings: React.FC<Props> = ({
  partner: {
    id: partnerId,
    hasTotalStation,
    hasGNSS,
    hasLevel,
    hasDrone,
    willingToTakeLongTermProjects: lt,
    willingToTravelUpTo: upTo,
    willingToRegularlyTravelUpTo: regUpTo,
    ...theRest
  },
}) => {
  return (
    <>
      <Typography variant="h6">
        <PrimaryDarkText>Предпочитания</PrimaryDarkText>
      </Typography>

      <LabelAndData label="Колко далеч би пътувал">
        <EditableData
          data={upTo.toString()}
          displayData={(d) => (d === '1' ? `${d} час` : `${d} часа`)}
          url={`/api/partners/${partnerId}/willingToTravelUpTo`}
          invalidates={['admin', 'partners', partnerId]}
          inputComponent={
            <TextField
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">часа</InputAdornment>
                ),
              }}
            />
          }
          validation={{
            min: { value: 0.5, message: 'Не може по-малко от един час' },
          }}
        />
      </LabelAndData>
      <LabelAndData label="Колко далеч би пътувал редовно">
        <EditableData
          data={regUpTo.toString()}
          displayData={(d) => (d === '1' ? `${d} час` : `${d} часа`)}
          url={`/api/partners/${partnerId}/willingToRegularlyTravelUpTo`}
          invalidates={['admin', 'partners', partnerId]}
          inputComponent={
            <TextField
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">часа</InputAdornment>
                ),
              }}
            />
          }
          validation={{
            min: { value: 0.5, message: 'Не може по-малко от един час' },
          }}
        />
      </LabelAndData>
      <EditableSwitch
        checked={lt}
        label={`${lt ? 'Би' : 'Не би'} приел дългосрочни задачи`}
        url={`/api/partners/${partnerId}/willingToTakeLongTermProjects`}
        invalidates={['admin', 'partners', partnerId]}
      />

      <Typography variant="h6">
        <PrimaryDarkText>Инструменти</PrimaryDarkText>
      </Typography>

      <EditableSwitch
        checked={hasTotalStation}
        label={`${hasTotalStation ? 'Има' : 'Няма'} тотална станция`}
        url={`/api/partners/${partnerId}/hasTotalStation`}
        invalidates={['admin', 'partners', partnerId]}
      />
      <EditableSwitch
        checked={hasGNSS}
        label={`${hasGNSS ? 'Има' : 'Няма'} GPS/GNSS`}
        url={`/api/partners/${partnerId}/hasGNSS`}
        invalidates={['admin', 'partners', partnerId]}
      />
      <EditableSwitch
        checked={hasLevel}
        label={`${hasLevel ? 'Има' : 'Няма'} нивелир`}
        url={`/api/partners/${partnerId}/hasLevel`}
        invalidates={['admin', 'partners', partnerId]}
      />
      <EditableSwitch
        checked={hasDrone}
        label={`${hasDrone ? 'Има' : 'Няма'} дрон`}
        url={`/api/partners/${partnerId}/hasDrone`}
        invalidates={['admin', 'partners', partnerId]}
      />

      <Typography variant="h6">
        <PrimaryDarkText>Компетенции</PrimaryDarkText>
      </Typography>

      <Stack spacing={2}>
        {comps.map((c) => (
          <LabelAndData key={c} label={compLabels[c]} labelWidth={25}>
            <EditableData
              data={theRest[c]}
              displayData={(c) => {
                switch (c) {
                  case 'UNABLE':
                    return 'Не желае';
                  case 'ABLE':
                    return 'При нужда';
                  case 'WILLING':
                    return 'Желае';
                  default:
                    return 'Непосочено';
                }
              }}
              url={`/api/partners/${partnerId}/${c}`}
              invalidates={['admin', 'partners', partnerId]}
            >
              <Controller
                render={({ field: { value, onChange } }) => (
                  <CompetencySwitch value={value} onChange={onChange} />
                )}
                name="data"
              />
            </EditableData>
          </LabelAndData>
        ))}
      </Stack>
    </>
  );
};

export default AdminPartnerSettings;
