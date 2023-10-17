import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { MsgUs_FormInputs } from '../form-data-type';
import NameInput from './name-input';

describe('NameInput', () => {
  it('renders a text input', () => {
    const TestComponent = () => {
      const methods = useForm<MsgUs_FormInputs>({
        mode: 'onChange',
        defaultValues: { name: '' },
      });

      return (
        <FormProvider {...methods}>
          <NameInput label="test label" />
        </FormProvider>
      );
    };
    render(<TestComponent />);

    const nameInput = screen.getByLabelText('test label');

    expect(nameInput).toBeInTheDocument();
  });

  it('can controll text input', async () => {
    let text = '';
    const TestComponent = () => {
      const methods = useForm<MsgUs_FormInputs>({
        mode: 'onChange',
        defaultValues: { name: '' },
      });

      text = methods.watch('name');

      return (
        <FormProvider {...methods}>
          <NameInput label="test label" />
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
});
