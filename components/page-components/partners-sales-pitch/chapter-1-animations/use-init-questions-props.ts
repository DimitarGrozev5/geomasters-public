import { MotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export const useInitQuestionsProps = (headerScroll: MotionValue<number>) => {
  const [x1, setX1] = useState('30rem');
  const [op1, setOp1] = useState(0);
  const [x2, setX2] = useState('30rem');
  const [op2, setOp2] = useState(0);
  const [x3, setX3] = useState('30rem');
  const [op3, setOp3] = useState(0);
  const [x4, setX4] = useState('30rem');
  const [op4, setOp4] = useState(0);
  const [xLogo, setXLogo] = useState('-30rem');
  const [opLogo, setOpLogo] = useState(0);

  const [headingOffset, setHeadingOffset] = useState('2rem');

  useEffect(
    () =>
      headerScroll.onChange((latest) => {
        if (latest > 0.45) {
          setHeadingOffset('0rem');
          setX1('0rem');
          setOp1(1);
        }
      }),
    [headerScroll]
  );

  useEffect(() => {
    if (x1 === '0rem') {
      setTimeout(() => {
        setX2('0rem');
        setOp2(1);

        setTimeout(() => {
          setX3('0rem');
          setOp3(1);

          setTimeout(() => {
            setX3('0rem');
            setOp3(1);

            setTimeout(() => {
              setX4('0rem');
              setOp4(1);
              setXLogo('0rem');
              setOpLogo(1);
            }, 500);
          }, 200);
        }, 200);
      }, 200);
    }
  }, [x1]);

  return { x1, op1, x2, op2, x3, op3, x4, op4, xLogo, opLogo, headingOffset };
};
