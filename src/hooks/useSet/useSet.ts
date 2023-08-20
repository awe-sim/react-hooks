import { useCallback, useState } from 'react';

export function useSet<T>(initialSet: Set<T> = new Set()) {
  //
  const [set, setSet] = useState(initialSet);

  const addOne = useCallback((item: T) => {
    let value: Set<T> = new Set();
    setSet((prev) => {
      value = new Set(prev).add(item);
      return value;
    });
    return value;
  }, []);

  const addAll = useCallback((...items: T[]) => {
    let value: Set<T> = new Set();
    setSet((prev) => {
      value = new Set(prev);
      items.forEach((item) => {
        value = value.add(item);
      });
      return value;
    });
    return value;
  }, []);

  const deleteOne = useCallback((item: T) => {
    let value: boolean = false;
    setSet((prev) => {
      if (!prev.has(item)) return prev;
      const newSet = new Set(prev);
      value = newSet.delete(item);
      return newSet;
    });
    return value;
  }, []);

  const deleteAll = useCallback((...items: T[]) => {
    setSet((prev) => {
      const newSet = new Set(prev);
      items.forEach((item) => newSet.delete(item));
      return newSet;
    });
  }, []);

  const clear = useCallback(() => {
    setSet(new Set());
  }, []);

  return [set, setSet, { addOne, addAll, deleteOne, deleteAll, clear }] as const;
}
