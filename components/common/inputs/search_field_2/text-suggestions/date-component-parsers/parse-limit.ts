export const parseFrom =
  () =>
  (txt: string): boolean => {
    const t = txt.trim().toLowerCase();
    return t === 'от' || t === 'след';
  };

export const parseTo =
  () =>
  (txt: string): boolean => {
    const t = txt.trim().toLowerCase();
    return t === 'до' || t === 'преди';
  };

export const parseRange =
  () =>
  (txt: string): boolean => {
    const t = txt.trim().toLowerCase();
    return t === 'за';
  };
