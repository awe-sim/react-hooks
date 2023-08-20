import { useCallback, useState } from 'react';

export function useList<T>(initialList: T[] = []) {
  //
  const [list, setList] = useState(initialList);

  const fill = useCallback((value: T, start?: number, end?: number) => {
    setList((prev) => {
      const newList = [...prev].fill(value, start, end);
      return newList;
    });
  }, []);

  const pop = useCallback(() => {
    let value: T | undefined;
    setList((prev) => {
      if (prev.length === 0) return prev;
      const newList = [...prev];
      value = newList.pop();
      return newList;
    });
    return value;
  }, []);

  const push = useCallback((value: T) => {
    setList((prev) => prev.concat(value));
  }, []);

  const reverse = useCallback(() => {
    let value: T[] = [];
    setList((prev) => {
      if (prev.length === 0) return prev;
      const newList = [...prev].reverse();
      value = newList;
      return newList;
    });
    return value;
  }, []);

  const shift = useCallback(() => {
    let value: T | undefined;
    setList((prev) => {
      if (prev.length === 0) return prev;
      const newList = [...prev];
      value = newList.shift();
      return newList;
    });
    return value;
  }, []);

  const sort = useCallback((fnCompare?: ((a: T, b: T) => number) | undefined) => {
    setList((prev) => {
      if (prev.length === 0) return prev;
      const newList = [...prev].sort(fnCompare);
      return newList;
    });
  }, []);

  const splice = useCallback((start: number, deleteCount?: number, ...items: T[]) => {
    let value: T[] = [];
    setList((prev) => {
      const newList = [...prev];
      value = newList.splice(start, deleteCount ?? 0, ...items);
      return newList;
    });
    return value;
  }, []);

  const unshift = useCallback((...items: T[]) => {
    let value: number = 0;
    setList((prev) => {
      const newList = [...prev];
      value = newList.unshift(...items);
      return newList;
    });
    return value;
  }, []);

  return [list, setList, { fill, pop, push, reverse, shift, sort, splice, unshift }] as const;
}
