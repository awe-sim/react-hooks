import { useCallback, useState } from 'react';

export function useMap<K, T>(initialMap: Map<K, T> = new Map()) {
  //
  const [map, setMap] = useState(initialMap);

  const set = useCallback((key: K, item: T) => {
    let value: Map<K, T> = new Map();
    setMap((prev) => {
      value = new Map(prev).set(key, item);
      return value;
    });
    return value;
  }, []);

  const clear = useCallback(() => {
    setMap(new Map());
  }, []);

  return [map, setMap, { set, clear }] as const;
}
