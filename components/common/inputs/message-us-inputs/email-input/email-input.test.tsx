import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { MsgUs_FormInputs } from '../form-data-type';
import EmailInput from './email-input';
import { act } from 'react-dom/test-utils';

describe('EmailInput', () => {
  it('renders a email input', () => {
    const TestComponent = () => {
      const methods = useForm<MsgUs_FormInputs>({
        mode: 'onChange',
        defaultValues: { name: '' },
      });

      return (
        <FormProvider {...methods}>
          <EmailInput label="test label" invalidErrMsg="invalid-err" />
        </FormProvider>
      );
    };
    render(<TestComponent />);

    const nameInput = screen.getByLabelText('test label');

    expect(nameInput).toBeInTheDocument();
  });

  it('can controll email input', async () => {
    let text = '';
    const TestComponent = () => {
      const methods = useForm<MsgUs_FormInputs>({
        mode: 'onChange',
        defaultValues: { email: '', phone: '' },
      });

      text = methods.watch('email');

      return (
        <FormProvider {...methods}>
          <EmailInput label="test label" invalidErrMsg="invalid-err" />
        </FormProvider>
      );
    };
    render(<TestComponent />);

    const nameInput = screen.getByLabelText('test label');
    await act(() => {
      fireEvent.change(nameInput, { target: { value: 'test input' } });
    });
    expect(text).toEqual('test input');
  });

  it('email displays error when an invalid value is submited', async () => {
    let text = '';
    let methods: UseFormReturn<MsgUs_FormInputs, any>;
    const TestComponent = () => {
      methods = useForm<MsgUs_FormInputs>({
        mode: 'onChange',
        defaultValues: { email: '', phone: '' },
      });

      text = methods.watch('email');

      return (
        <FormProvider {...methods}>
          <EmailInput label="test label" invalidErrMsg="invalid-err" />
        </FormProvider>
      );
    };
    render(<TestComponent />);

    const nameInput = screen.getByLabelText('test label');
    await act(() => {
      fireEvent.change(nameInput, { target: { value: 'test input' } });
    });

    await act(() => {
      methods!.trigger('email');
    });

    expect(methods!.formState.errors.email).not.toBeUndefined();
    expect(methods!.formState.errors.email!.message).toBe('invalid-err');
  });

  it("email doesn't displays error when nothing is submited", async () => {
    let text = '';
    let methods: UseFormReturn<MsgUs_FormInputs, any>;
    const TestComponent = () => {
      methods = useForm<MsgUs_FormInputs>({
        mode: 'onChange',
        defaultValues: { email: '', phone: '' },
      });

      text = methods.watch('email');

      return (
        <FormProvider {...methods}>
          <EmailInput label="test label" invalidErrMsg="invalid-err" />
        </FormProvider>
      );
    };
    render(<TestComponent />);

    await act(() => {
      methods!.trigger('email');
    });

    expect(methods!.formState.errors.email).toBeUndefined();
  });
});
