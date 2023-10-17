import {
  fireEvent,
  getByLabelText,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { MsgUs_FormInputs } from '../form-data-type';
import { act } from 'react-dom/test-utils';
import { ThemeProvider } from '@mui/system';
import fontSizesTheme from '../../../../../styles/themes/light-theme-options';
import SelectLocation from './select-location';
import {
  ekatte,
  EkatteData,
  OblastData,
  oblasti,
} from '../../../../../data/ekatte';

describe.skip('LocationInput', () => {
  it('renders a location input', () => {
    const TestComponent = () => {
      const methods = useForm<MsgUs_FormInputs>({
        mode: 'onChange',
        defaultValues: {
          oblast: oblasti[1],
          settlement: null,
        },
      });

      return (
        <ThemeProvider theme={fontSizesTheme}>
          <FormProvider {...methods}>
            <SelectLocation
              oblastLabel={'oblastLabel'}
              settlementLabel={'settlementLabel'}
              oblastErrorMsg={'oblastErrorMsg'}
              settlementErrorMsg={'settlementErrorMsg'}
            />
          </FormProvider>
        </ThemeProvider>
      );
    };
    render(<TestComponent />);

    const oblastInput = screen.getByLabelText('oblastLabel');
    const settlementInput = screen.getByLabelText('settlementLabel');

    expect(oblastInput).toBeInTheDocument();
    expect(settlementInput).toBeInTheDocument();
  });

  it('selecting a settlement sets the oblast', async () => {
    let methods: UseFormReturn<MsgUs_FormInputs, any>;
    const TestComponent = () => {
      methods = useForm<MsgUs_FormInputs>({
        mode: 'onChange',
        defaultValues: { oblast: null, settlement: null },
      });

      return (
        <ThemeProvider theme={fontSizesTheme}>
          <FormProvider {...methods}>
            <SelectLocation
              oblastLabel={'oblastLabel'}
              settlementLabel={'settlementLabel'}
              oblastErrorMsg={'oblastErrorMsg'}
              settlementErrorMsg={'settlementErrorMsg'}
            />
          </FormProvider>
        </ThemeProvider>
      );
    };
    render(<TestComponent />);

    // Change the value of settlement
    await act(() => {
      methods.setValue('settlement', ekatte[1]);
    });

    let oblast: OblastData | null;
    await waitFor(() => {
      oblast = methods.getValues('oblast');
    });

    expect(oblast!).not.toBeNull();
    expect(oblast!.id).toBe('OB');
  });

  it('changing the oblast resets the settlement', async () => {
    let methods: UseFormReturn<MsgUs_FormInputs, any>;
    const TestComponent = () => {
      methods = useForm<MsgUs_FormInputs>({
        mode: 'onChange',
        defaultValues: { oblast: oblasti[0], settlement: ekatte[0] },
      });

      return (
        <ThemeProvider theme={fontSizesTheme}>
          <FormProvider {...methods}>
            <SelectLocation
              oblastLabel={'oblastLabel'}
              settlementLabel={'settlementLabel'}
              oblastErrorMsg={'oblastErrorMsg'}
              settlementErrorMsg={'settlementErrorMsg'}
            />
          </FormProvider>
        </ThemeProvider>
      );
    };
    render(<TestComponent />);

    // Change the value of oblast
    await act(() => {
      methods.setValue('oblast', oblasti[0]);
    });

    let selectedEkatte: EkatteData | null;
    await waitFor(() => {
      selectedEkatte = methods.getValues('settlement');
    });
    expect(selectedEkatte!).not.toBeNull();

    // Change the value of oblast
    await act(() => {
      methods.setValue('oblast', oblasti[1]);
    });

    await waitFor(() => {
      selectedEkatte = methods.getValues('settlement');
    });
    expect(selectedEkatte!).toBeNull();
  });
});
