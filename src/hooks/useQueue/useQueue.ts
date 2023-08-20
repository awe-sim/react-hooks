import { useCallback, useState } from 'react';

export function useQueue<T>(initialQueue: T[] = []) {
  //
  const [queue, setQueue] = useState(initialQueue);

  const enqueue = useCallback((value: T) => {
    setQueue((prev) => prev.concat(value));
  }, []);

  const dequeue = useCallback(() => {
    let value: T | undefined;
    setQueue((prev) => {
      if (prev.length === 0) return prev;
      const newList = [...prev];
      value = newList.shift();
      return newList;
    });
    return value;
  }, []);

  return [queue, setQueue, { enqueue, dequeue }] as const;
}
