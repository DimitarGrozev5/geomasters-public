import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { MsgUs_FormInputs } from '../form-data-type';
import PhoneInput from './phone-input';
import { act } from 'react-dom/test-utils';
import { ThemeProvider } from '@mui/system';
import fontSizesTheme from '../../../../../styles/themes/light-theme-options';

describe('PhoneInput', () => {
  it('renders a phone input', () => {
    const TestComponent = () => {
      const methods = useForm<MsgUs_FormInputs>({
        mode: 'onChange',
      });

      return (
        <ThemeProvider theme={fontSizesTheme}>
          <FormProvider {...methods}>
            <PhoneInput
              phonelabel="test label"
              viberlabel="test viber label"
              invalidWarningMsg="invalid-err"
              emptyErrorMessage="emailAndPhoneErrMsg"
            />
          </FormProvider>
        </ThemeProvider>
      );
    };
    render(<TestComponent />);

    const nameInput = screen.getByLabelText('test label');

    expect(nameInput).toBeInTheDocument();
  });

  it("doesn't render a viber switch if the phone field is empty", () => {
    const TestComponent = () => {
      const methods = useForm<MsgUs_FormInputs>({
        mode: 'onChange',
        defaultValues: { phone: '' },
      });

      return (
        <ThemeProvider theme={fontSizesTheme}>
          <FormProvider {...methods}>
            <PhoneInput
              phonelabel="test label"
              viberlabel="test viber label"
              invalidWarningMsg="invalid-err"
              emptyErrorMessage="emailAndPhoneErrMsg"
            />
          </FormProvider>
        </ThemeProvider>
      );
    };
    render(<TestComponent />);

    const nameInput = screen.queryByLabelText('test viber label');

    expect(nameInput).not.toBeInTheDocument();
  });

  it('renders a viber switch if the phone field is not empty', () => {
    const TestComponent = () => {
      const methods = useForm<MsgUs_FormInputs>({
        mode: 'onChange',
        defaultValues: { phone: '0889393939' },
      });

      return (
        <ThemeProvider theme={fontSizesTheme}>
          <FormProvider {...methods}>
            <PhoneInput
              phonelabel="test label"
              viberlabel="test viber label"
              invalidWarningMsg="invalid-err"
              emptyErrorMessage="emailAndPhoneErrMsg"
            />
          </FormProvider>
        </ThemeProvider>
      );
    };
    render(<TestComponent />);

    const nameInput = screen.queryByLabelText('test viber label');

    expect(nameInput).toBeInTheDocument();
  });

  it('can controll phone input', async () => {
    let text = '';
    const TestComponent = () => {
      const methods = useForm<MsgUs_FormInputs>({
        mode: 'onChange',
        defaultValues: { email: '', phone: '' },
      });

      text = methods.watch('phone');

      return (
        <ThemeProvider theme={fontSizesTheme}>
          <FormProvider {...methods}>
            <PhoneInput
              phonelabel="test label"
              viberlabel="test viber label"
              invalidWarningMsg="invalid-err"
              emptyErrorMessage="emailAndPhoneErrMsg"
            />
          </FormProvider>
        </ThemeProvider>
      );
    };
    render(<TestComponent />);

    const nameInput = screen.getByLabelText('test label');
    await act(() => {
      fireEvent.change(nameInput, { target: { value: 'test input' } });
    });
    expect(text).toEqual('test input');
  });

  it('phone displays warning when an invalid value is submited', async () => {
    let text = '';
    let methods: UseFormReturn<MsgUs_FormInputs, any>;
    const TestComponent = () => {
      methods = useForm<MsgUs_FormInputs>({
        mode: 'onChange',
        defaultValues: { email: '', phone: '' },
      });

      text = methods.watch('phone');

      return (
        <ThemeProvider theme={fontSizesTheme}>
          <FormProvider {...methods}>
            <PhoneInput
              phonelabel="test label"
              viberlabel="test viber label"
              invalidWarningMsg="invalid-err"
              emptyErrorMessage="emailAndPhoneErrMsg"
              warningTrottleDuration={0}
            />
          </FormProvider>
        </ThemeProvider>
      );
    };
    render(<TestComponent />);

    const nameInput = screen.getByLabelText('test label');
    await act(() => {
      fireEvent.change(nameInput, { target: { value: 'test input' } });
    });

    await act(() => {
      methods!.trigger('phone');
    });

    let warning;
    await waitFor(() => {
      warning = screen.getByText('invalid-err');
    });

    expect(warning).toBeInTheDocument();
  });

  it('phone displays error when no value is submited', async () => {
    let text = '';
    let methods: UseFormReturn<MsgUs_FormInputs, any>;
    const TestComponent = () => {
      methods = useForm<MsgUs_FormInputs>({
        mode: 'onChange',
        defaultValues: { email: '', phone: '' },
      });

      text = methods.watch('phone');

      return (
        <ThemeProvider theme={fontSizesTheme}>
          <FormProvider {...methods}>
            <PhoneInput
              phonelabel="test label"
              viberlabel="test viber label"
              invalidWarningMsg="invalid-err"
              emptyErrorMessage="emailAndPhoneErrMsg"
            />
          </FormProvider>
        </ThemeProvider>
      );
    };
    render(<TestComponent />);

    await act(() => {
      methods!.trigger('phone');
    });

    expect(methods!.formState.errors.phone).not.toBeUndefined();
    expect(methods!.formState.errors.phone!.message).toBe(
      'emailAndPhoneErrMsg'
    );
  });
});
