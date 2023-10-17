import { isNumeric } from '../../../../../../utility/isNumeric';

export const parseYear = (acceptedLengths: number[]) => (txt: string) => {
  if (!isNumeric(txt)) return false;
  if (!acceptedLengths.includes(txt.length)) return false;

  const year = Number(txt);
  const fullYear = year < 1000 ? year + 2000 : year;
  if (fullYear < 1990) return false;

  return fullYear;  
};
