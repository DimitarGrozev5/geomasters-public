import { useState } from 'react';
import {
  Box,
  Button,
  MobileStepper,
  Step,
  StepLabel,
  Stepper,
  useTheme,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { MsgUs_FormInputs } from '../form-data-type';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import MobileFirstStep from './mobile-step-1';
import MobileSecondStep from './mobile-step-2';
import MobileThirdStep from './mobile-step-3';
import MobileFourthStep from './mobile-step-4';
import { LoadingButton } from '@mui/lab';

type Props = {
  onSubmit: () => void;
  loading: boolean;
  onClose: () => void;
};

const MsgUsStepperMobile: React.FC<Props> = ({
  onClose,
  onSubmit,
  loading,
}) => {
  const theme = useTheme();

  // Handle the active step in the three step stepper
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 4;

  const { trigger } = useFormContext<MsgUs_FormInputs>();

  // When moving to screen two, make the user has entered an email or a phone or both
  const handleMoveToStep2 = async () => {
    const firstStepIsValid = await trigger(['email', 'phone']);
    if (!firstStepIsValid) {
      return false;
    }
    return true;
  };
  const handleMoveToStep3 = async () => {
    const secondStepIsValid = await trigger(['problemDescription']);
    if (!secondStepIsValid) {
      return false;
    }
    return true;
  };
  const handleMoveToStep4 = async () => {
    const thirdStepIsValid = await trigger(['ekatte']);
    if (!thirdStepIsValid) {
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    let move = true;
    switch (activeStep) {
      case 0:
        move = await handleMoveToStep2();
        break;
      case 1:
        move = await handleMoveToStep3();
        break;
      case 2:
        move = await handleMoveToStep4();
        break;

      default:
        break;
    }
    setActiveStep((s) => (move ? s + 1 : s));
  };
  const handleBack = () => {
    setActiveStep((s) => s - 1);
  };

  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          width: '100%',
        }}
      >
        {activeStep === 0 && <MobileFirstStep />}
        {activeStep === 1 && <MobileSecondStep />}
        {activeStep === 2 && <MobileThirdStep />}
        {activeStep === 3 && <MobileFourthStep />}
      </Box>

      {activeStep === 3 && (
        <LoadingButton
          loading={loading}
          onClick={onSubmit}
          sx={{ fontSize: (theme) => theme.spacing(2.5) }}
          variant="contained"
        >
          Изпратете запитване
        </LoadingButton>
      )}

      <MobileStepper
        variant="text"
        steps={maxSteps}
        activeStep={activeStep}
        sx={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Напред
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Назад
          </Button>
        }
      />
    </>
  );
};

export default MsgUsStepperMobile;
