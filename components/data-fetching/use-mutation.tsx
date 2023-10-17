import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import {
  QueryKey,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { Config, sendRequest } from './http-client';

type EventHandlers = {
  onSuccess?: () => void;
  onError?: () => void;

  alertOnSuccess?: {
    message: string;
    persist?: boolean;
    duration?: number;
    withAction?: boolean;
  };
  alertOnError?: {
    message?: string;
    persist?: boolean;
    duration?: number;
    withAction?: boolean;
  };
};

export const useConfiguredMutation = (
  urlOrHandler: string | (() => Promise<any>),
  config: Config,
  invalidates: QueryKey | undefined,
  {
    onSuccess = () => {},
    onError = () => {},
    alertOnSuccess,
    alertOnError = {},
  }: EventHandlers
): UseMutationResult => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const result = useMutation(
    typeof urlOrHandler === 'string' ? sendRequest(urlOrHandler, config) : urlOrHandler,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(invalidates, {
          exact: false,
        });
        onSuccess();
        if (alertOnSuccess) {
          const key = enqueueSnackbar(alertOnSuccess.message, {
            autoHideDuration: alertOnSuccess.duration,
            persist: !!alertOnSuccess.persist,
            action:
              !!alertOnSuccess.persist || !!alertOnSuccess.withAction ? (
                <Button onClick={() => closeSnackbar(key)}>ОК</Button>
              ) : undefined,
            variant: 'success',
          });
        }
      },
      onError: (error) => {
        onError();
        if (alertOnError) {
          let msgFromError = 'Нещо се обърка';
          if (error && typeof error === 'object') {
            if (
              'userMessage' in error &&
              typeof error.userMessage === 'string'
            ) {
              msgFromError = error.userMessage;
            } else if (
              'message' in error &&
              typeof error.message === 'string'
            ) {
              msgFromError = error.message;
            }
          }

          const key = enqueueSnackbar(alertOnError.message ?? msgFromError, {
            autoHideDuration: alertOnError.duration,
            persist: !!alertOnError.persist,
            action:
              !!alertOnError.persist || !!alertOnError.withAction ? (
                <Button onClick={() => closeSnackbar(key)}>ОК</Button>
              ) : undefined,
            variant: 'error',
          });
        }
      },
    }
  );

  return result;
};
