import { useCallback, useState } from 'react';

export function useStack<T>(initialStack: T[] = []) {
  //
  const [stack, setStack] = useState(initialStack);

  const pop = useCallback(() => {
    let value: T | undefined;
    setStack((prev) => {
      if (prev.length === 0) return prev;
      const newStack = [...prev];
      value = newStack.pop();
      return newStack;
    });
    return value;
  }, []);

  const push = useCallback((value: T) => {
    setStack((prev) => prev.concat(value));
  }, []);

  return [stack, setStack, { pop, push }] as const;
}
