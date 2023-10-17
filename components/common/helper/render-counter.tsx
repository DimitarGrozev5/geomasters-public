import { useRef } from 'react';

const RenderCounter = () => {
  const count = useRef(0);

  count.current++;

  return <>{count.current}</>;
};

export default RenderCounter;
