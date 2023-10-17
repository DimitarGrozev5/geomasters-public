import { createContext, useContext } from 'react';
import { assertDefined } from '../../../../utility/assertContext';

export type GlobalContext = {
  openSendMessage: () => void;
};
export const GlobalContext = createContext<GlobalContext | null>(null);

export const useGlobalContext = () => {
  const globalCtx = useContext(GlobalContext);
  assertDefined(globalCtx);
  return globalCtx;
};
