import { useState } from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { MsgUs_FormInputs } from '../form-data-type';
import FirstStep from './step-1';
import SecondStep from './step-2';
import ThirdStep from './step-3';

type Props = {
  onSubmit: () => void;
  loading: boolean;
  onClose: () => void;
};

const MsgUsStepper: React.FC<Props> = ({ onSubmit, loading, onClose }) => {
  // Handle the active step in the three step stepper
  const [activeStep, setActiveStep] = useState(0);

  const { trigger } = useFormContext<MsgUs_FormInputs>();

  // When moving to screen two, make the user has entered an email or a phone or both
  const handleMoveToStep2 = async () => {
    const firstStepIsValid = await trigger(['email', 'phone']);
    if (!firstStepIsValid) {
      return;
    }
    setActiveStep(1);
  };
  const handleMoveToStep3 = async () => {
    const secondStepIsValid = await trigger(['ekatte', 'problemDescription']);
    if (!secondStepIsValid) {
      return;
    }
    setActiveStep(2);
  };

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Данни за контакт</StepLabel>
        </Step>

        <Step>
          <StepLabel>Вашият проблем</StepLabel>
        </Step>

        <Step>
          <StepLabel>Завършване</StepLabel>
        </Step>
      </Stepper>

      {activeStep === 0 && (
        <FirstStep onClose={onClose} handleMoveToStep2={handleMoveToStep2} />
      )}

      {activeStep === 1 && (
        <SecondStep
          goBack={() => setActiveStep(0)}
          handleMoveToStep3={handleMoveToStep3}
        />
      )}

      {activeStep === 2 && (
        <ThirdStep
          goBack={() => setActiveStep(1)}
          submitHandler={onSubmit}
          loading={loading}
        />
      )}
    </>
  );
};

export default MsgUsStepper;
