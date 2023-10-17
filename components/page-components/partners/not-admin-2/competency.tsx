import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { Controller } from 'react-hook-form';
import { DetailedPartner } from '../../../../pages/api/partners/[partnerId]';
import LabelAndData from '../../../common/data-presentation/label-and-data';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';
import CompetencySwitch from '../../../common/inputs/competency-switch';
import EditableData from '../../../common/inputs/editable-fields/editable-data';
import { useConfiguredMutation } from '../../../data-fetching/use-mutation';
import ProfileCard from './profile-card';

type Props = { partner: DetailedPartner; flex?: number };

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
  competentInGrading: 'Инвестиционно проектиране',
  competentInConstructionLayout: 'Строително трасиране',
  competentInGeneralEngineering: 'Инженерна геодезия',
  competentInEvaluations: 'Оценки',
};

const compDesc = {
  competentInSurvey: 'Геодезически заснемания, заснемане за проектиране',
  competentInLayout: 'Трасиране на грниците на имоти',
  competentInCadastre:
    'Попълване на сгради, попълване на СОС, обединение и делба на имоти, нанасяне на ПУП и др.',
  competentInExpertise: 'Технически експертизи, комбинирани скици',
  competentInPUP: 'Изготвяне на скица предложение, изготвяне на ПУП',
  competentInGrading:
    'Вертикални планировки, трасировъчни планове, картограми на земните маси',
  competentInConstructionLayout:
    'Трасиране на конструктивните елементи на сгради, нивелация, определяне на нива и др.',
  competentInGeneralEngineering:
    'Полагане на РГО, определяне на деформации и др.',
  competentInEvaluations: 'Оценки на ПИ, Оценки на СОС',
};

const ProfileCompetency: React.FC<Props> = ({ partner, flex }) => {
  const compactSize = useMediaQuery('(max-width:550px)');
  return (
    <ProfileCard flex={flex} border="alternative">
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        <PrimaryDarkText>
          Искате ли да се занимавате с тези задачи?
        </PrimaryDarkText>
      </Typography>

      <Stack spacing={compactSize ? 10 : 4}>
        {comps.map((c) => (
          <CompCard comp={c} partner={partner} key={c} />
        ))}
      </Stack>
    </ProfileCard>
  );
};

function CompCard({
  comp,
  partner,
}: {
  comp: keyof Comps;
  partner: DetailedPartner;
}) {
  const { isLoading, mutate } = useConfiguredMutation(
    `/api/partners/${partner.id}/${comp}`,
    { method: 'PATCH' },
    ['partner', partner.id],
    {}
  );

  const compactSize = useMediaQuery('(max-width:550px)');

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        gap: 2,
        flexDirection: compactSize ? 'column' : 'row',
      }}
    >
      <Box flex={2}>
        <Typography variant="h6">{compLabels[comp]}</Typography>
        <Typography variant="subtitle2">{compDesc[comp]}</Typography>
      </Box>
      <Box flex={3}>
        <CompetencySwitch
          value={partner[comp]}
          onChange={(c) => mutate({ data: c })}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
}

export default ProfileCompetency;
