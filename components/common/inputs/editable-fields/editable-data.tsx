import React, { useEffect, useState } from 'react';

import {
  Box,
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

import { Controller, RegisterOptions, useForm } from 'react-hook-form';
import { useConfiguredMutation } from '../../../data-fetching/use-mutation';
import { QueryKey } from 'react-query';
import Confirm from '../confirm-button';

type Props = {
  data: string;
  displayData?: (d: string) => string | React.ReactNode;
  placeholder?: string | React.ReactNode;
  url: string;
  invalidates?: QueryKey;
  successMessage?: string;
  withDelete?: {
    url: string;
    invalidates?: QueryKey;
    successMessage?: string;
  };
  validation?: RegisterOptions;
  inputComponent?: React.ReactElement<
    React.ComponentProps<typeof TextField>,
    typeof TextField
  >;
  children?: React.ReactElement<any, typeof Controller>;
  inViewMode?: boolean;
  setInViewMode?: (b: boolean) => void;
  hideControls?: boolean;
} & (
  | {
      inputComponent?: React.ReactElement<
        React.ComponentProps<typeof TextField>,
        typeof TextField
      >;
      children?: never;
    }
  | {
      inputComponent?: never;
      children: React.ReactElement<any, typeof Controller>;
    }
);

type FormData = {
  data: string;
};

const EditableData: React.FC<Props> = ({
  data,
  displayData = (d) => d,
  placeholder = 'Непосочено',
  url,
  invalidates,
  successMessage = 'Успешно направена промяна',
  withDelete,
  validation,
  inputComponent = <TextField />,
  children,
  inViewMode,
  setInViewMode,
  hideControls = false,
}) => {
  // Handle view mode
  const [iInViewMode, setIInViewMode] = useState(
    inViewMode === undefined ? true : inViewMode
  );

  const vm = inViewMode !== undefined ? inViewMode : iInViewMode;
  useEffect(() => {
    if (!!setInViewMode && iInViewMode !== inViewMode) {
      setInViewMode(iInViewMode);
    }
  }, [iInViewMode, inViewMode, setInViewMode]);

  // Handle form data
  const methods = useForm<FormData>({
    mode: 'onChange',
    defaultValues: { data: data },
  });

  const {
    control,
    register,
    reset: resetForm,
    handleSubmit,
    formState: { errors },
  } = methods;

  // Handle data submition
  const { isLoading, mutate: updateData } = useConfiguredMutation(
    url,
    { method: 'PATCH' },
    invalidates,
    {
      onSuccess: () => setIInViewMode(true),
      alertOnSuccess: { message: successMessage },
    }
  );

  // Handle data deletion
  const { isLoading: deleteIsLoading, mutate: deleteData } =
    useConfiguredMutation(
      withDelete?.url || '',
      { method: 'DELETE' },
      withDelete?.invalidates,
      {
        alertOnSuccess: {
          message: withDelete?.successMessage || 'Успешно направена промяна',
        },
      }
    );

  const cancelEditHandler = () => {
    resetForm();
    setIInViewMode(true);
  };

  const saveHandler = (data: FormData) => {
    updateData(data);
  };

  if (vm) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1">
          {data ? displayData(data) : placeholder}
        </Typography>
        {!hideControls && (
          <Tooltip title="Редактирай">
            <IconButton onClick={() => setIInViewMode(false)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {!children &&
        React.cloneElement(inputComponent, {
          ...register('data', validation),
          helperText: errors.data?.message,
          error: !!errors.data,
        })}
      {children && React.cloneElement(children, { control })}
      {!hideControls && (
        <>
          <Tooltip title="Откажи">
            <IconButton onClick={cancelEditHandler}>
              <CancelIcon />
            </IconButton>
          </Tooltip>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Tooltip title="Запази">
              <IconButton onClick={handleSubmit(saveHandler)}>
                <SaveIcon />
              </IconButton>
            </Tooltip>
          )}
          {withDelete && (
            <>
              {deleteIsLoading ? (
                <CircularProgress />
              ) : (
                <Confirm
                  onClick={() => deleteData(undefined)}
                  label="Изтривате имейла"
                >
                  <Tooltip title="Изтрий">
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Confirm>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default EditableData;
