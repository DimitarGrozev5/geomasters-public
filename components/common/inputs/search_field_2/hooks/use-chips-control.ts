import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { SearchValue } from '../search-value-type';
import { Chips } from '../sub-comp/attr-chips-display';

export const useChipsControl = (
  chips: Chips,
  setChips: Dispatch<SetStateAction<Chips>>
) => {
  const handleDeleteChip = useCallback(
    (chipToDelete: SearchValue) => () => {
      setChips((chps) => {
        switch (chipToDelete.type) {
          case 'status':
            return { ...chps, status: null };
          case 'category':
            return { ...chps, category: null };
          case 'date-from':
            return { ...chps, dateFrom: null };
          case 'date-to':
            return { ...chps, dateTo: null };
          case 'ekatte':
            return { ...chps, location: null };
          case 'rnd-text':
            return { ...chps, rnd: chps.rnd.filter((r) => r !== chipToDelete) };

          default:
            return { ...chps };
        }
      });
    },
    [setChips]
  );

  const setStatus = useCallback(
    (status: SearchValue | null) => {
      setChips((chps) => ({ ...chps, status }));
    },
    [setChips]
  );

  const setCategory = useCallback(
    (category: SearchValue | null) => {
      setChips((chps) => ({ ...chps, category }));
    },
    [setChips]
  );

  const setLocation = useCallback(
    (location: SearchValue | null) => {
      setChips((chps) => ({ ...chps, location }));
    },
    [setChips]
  );

  const setDateFrom = useCallback(
    (dateFrom: SearchValue | null) => {
      setChips((chps) => {
        if (chps.dateTo === null || dateFrom === null)
          return { ...chps, dateFrom };

        const dateFromUtc = +dateFrom.raw;
        const dateToUtc = +chps.dateTo.raw;

        if (dateFromUtc <= dateToUtc) return { ...chps, dateFrom };

        return {
          ...chps,
          dateFrom: {
            type: 'date-from',
            value: chps.dateTo.value,
            raw: chps.dateTo.raw,
          },
          dateTo: {
            type: 'date-to',
            value: dateFrom.value,
            raw: dateFrom.raw,
          },
        };
      });
    },
    [setChips]
  );
  const setDateTo = useCallback((dateTo: SearchValue | null) => {
    setChips((chps) => {
      if (chps.dateFrom === null || dateTo === null) return { ...chps, dateTo };

      const dateFromUtc = +chps.dateFrom.raw;
      const dateToUtc = +dateTo.raw;

      if (dateFromUtc <= dateToUtc) return { ...chps, dateTo };

      return {
        ...chps,
        dateFrom: {
          type: 'date-from',
          value: dateTo.value,
          raw: dateTo.raw,
        },
        dateTo: {
          type: 'date-to',
          value: chps.dateFrom.value,
          raw: chps.dateFrom.raw,
        },
      };
    });
  }, [setChips]);

  const setRnd = useCallback(
    (rnd: SearchValue | null) => {
      setChips((chps) => ({
        ...chps,
        rnd: rnd
          ? [...chps.rnd.filter((r) => r.raw !== rnd?.raw), rnd]
          : chps.rnd,
      }));
    },
    [setChips]
  );

  const pushChip = useCallback(
    (...vals: SearchValue[]) => {
      vals.forEach((val) => {
        switch (val.type) {
          case 'status':
            return setStatus(val);
          case 'category':
            return setCategory(val);
          case 'date-from':
            return setDateFrom(val);
          case 'date-to':
            return setDateTo(val);
          case 'ekatte':
            return setLocation(val);
          case 'rnd-text':
            return setRnd(val);

          default:
            return;
        }
      });
    },
    [setCategory, setDateFrom, setDateTo, setLocation, setRnd, setStatus]
  );

  const ret = useMemo(
    () => ({
      handleDeleteChip,
      setStatus,
      setCategory,
      setLocation,
      setDateFrom,
      setDateTo,
      setRnd,
      pushChip,
    }),
    [
      handleDeleteChip,
      setCategory,
      setDateFrom,
      setDateTo,
      setLocation,
      setStatus,
      setRnd,
      pushChip,
    ]
  );
  return ret;
};
