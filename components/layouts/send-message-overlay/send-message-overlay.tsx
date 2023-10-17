import {
  Fade,
  Paper,
  Stack,
  Backdrop,
  FormGroup,
  Typography,
  Portal,
  Button,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { MsgUs_FormInputs } from '../../common/inputs/message-us-inputs/form-data-type';
import MsgUsStepper from '../../common/inputs/message-us-inputs/steps/stepper';
import { useScreenSize } from '../../../hooks/use-screen-size';
import MsgUsStepperMobile from '../../common/inputs/message-us-inputs/steps-mobile/stepper-mobile';
import { useConfiguredMutation } from '../../data-fetching/use-mutation';
import { useSnackbar } from 'notistack';

type Props = {
  show: boolean;
  onClose: () => void;
};

const SendMessageOverlay: React.FC<Props> = ({ show, onClose }) => {
  // Setup the form
  const methods = useForm<MsgUs_FormInputs>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      hasViber: false,
      ekatte: null,
      problemDescription: '',
      meansOfContact: 'phone',
      recaptchaToken: '',
    },
  });
  const { handleSubmit } = methods;

  const screenSize = useScreenSize();

  const { isLoading, mutate } = useConfiguredMutation(
    '/api/messages',
    {
      method: 'POST',
    },
    undefined,
    {
      alertOnSuccess: {
        message: 'Съобщението беше изпратено. Ще се свържем с вас скоро.',
        duration: 10000,
        withAction: true,
      },
    }
  );

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<MsgUs_FormInputs> = async (data) => {
    let token: string | undefined = undefined;
    try {
      token = await new Promise((resolve, reject) => {
        grecaptcha.ready(() => {
          grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '', {
              action: 'submit',
            })
            .then((token) => {
              resolve(token);
            });
        });
      });
      if (!token) {
        throw new Error('Грешка при изпращане, пробвайте по-късно');
      }
    } catch (error) {
      enqueueSnackbar('Грешка при изпращане, пробвайте по-късно', {
        variant: 'error',
      });
      return;
    }

    mutate({ ...data, recaptchaToken: token });
    onClose();
  };

  return (
    <Portal>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.appBar + 10 }}
        open={show}
        onClick={onClose}
      />
      {(screenSize === 'xl' || screenSize === 'lg') && (
        <Fade in={show}>
          <Paper
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              zIndex: (theme) => theme.zIndex.appBar + 10,
              transform: 'translate(-50%, -50%)',
              width: { lg: '70vw', xl: '50vw' },
              boxShadow: 24,
              p: 4,
            }}
          >
            <FormProvider {...methods}>
              <FormGroup onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={4}>
                  <Typography variant="h5" sx={{ textAlign: 'center' }}>
                    <PrimaryDarkText>
                      След като обясните проблема си, ще се свържем с вас за
                      безплатна консултация
                    </PrimaryDarkText>
                  </Typography>

                  <MsgUsStepper
                    onSubmit={handleSubmit(onSubmit)}
                    loading={isLoading}
                    onClose={onClose}
                  />
                </Stack>
              </FormGroup>
            </FormProvider>
          </Paper>
        </Fade>
      )}
      {(screenSize === 'md' || screenSize == 'sm' || screenSize === 'xs') && (
        <Fade in={show}>
          <Paper
            sx={{
              position: 'fixed',
              top: { md: '5vh', xs: 0 },
              bottom: { md: '5vh', xs: 0 },
              left: '50%',
              zIndex: (theme) => theme.zIndex.drawer + 2,
              transform: 'translateX(-50%)',
              width: { md: '60vw', xs: '100vw' },
              boxShadow: 24,
              pt: 2,
              pl: 3,
              pr: 3,

              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <FormProvider {...methods}>
              <FormGroup
                onSubmit={handleSubmit(onSubmit)}
                sx={{ flex: 1, width: '100%', mb: (theme) => theme.spacing(8) }}
              >
                <Stack
                  gap={1}
                  justifyContent="space-between"
                  sx={{
                    flex: 1,
                    width: '100%',
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                      position: 'relative',
                      right: (theme) => theme.spacing(-3),
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ textAlign: 'center', flex: 1 }}
                    >
                      <PrimaryDarkText>
                        Обяснете проблема си, ще се свържем с вас за безплатна
                        консултация
                      </PrimaryDarkText>
                    </Typography>
                    <Button onClick={onClose} sx={{ alignSelf: 'flex-start' }}>
                      <CloseIcon />
                    </Button>
                  </Stack>

                  <MsgUsStepperMobile
                    onSubmit={handleSubmit(onSubmit)}
                    loading={isLoading}
                    onClose={onClose}
                  />
                </Stack>
              </FormGroup>
            </FormProvider>
          </Paper>
        </Fade>
      )}
    </Portal>
  );
};

export default SendMessageOverlay;
