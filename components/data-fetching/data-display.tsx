import React from 'react';
import { UseQueryResult } from 'react-query';

type Props<D, E> = {
  control: UseQueryResult<D, E>;

  loadingComponent: React.ReactNode;
  ErrorComponent: React.FC<{ error: E }>;
  ContentComponent: React.FC<{ data: D }>;
};

const DataDisplay = <D, E>({
  control,
  loadingComponent,
  ErrorComponent,
  ContentComponent,
}: Props<D, E>) => {
  const { isLoading, isError, error, data } = control;

  if (isLoading) {
    return <>{loadingComponent}</>;
  }
  if (isError) {
    return <ErrorComponent error={error} />;
  }
  return <ContentComponent data={data!} />;
};

export default DataDisplay;
