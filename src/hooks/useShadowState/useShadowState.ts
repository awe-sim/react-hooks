import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function log(...args: any) {
  const [id, ...rest] = args;
  // eslint-disable-next-line no-console
  if (id) console.log(id, ...rest);
}

type FnSetter<T> = (prevState: T) => T;
function isSetter<T>(valueOrSetter: React.SetStateAction<T>): valueOrSetter is FnSetter<T> {
  return typeof valueOrSetter === 'function';
}

type FnEquals<T> = (a: T, b: T) => boolean;

/**
 * Creates a corresponding ShadowState for the given InputState such that:
 * 1. Changes to ShadowState never propagate to InputState.
 * 2. Changes to InputState immediately propagate to ShadowState.
 * 3. Calling [apply] immediately propagates changes to InputState.
 * 4. Calling [revert] reverts ShadowState back to InputState.
 */
export function useShadowState<T>(value: T, setValue: React.Dispatch<React.SetStateAction<T>>, fnEquals: FnEquals<T>, id?: string) {
  const [shadowValue, setShadowValue] = useState(value);
  const fnEqualsRef = useRef(fnEquals);

  const setShadowValueWrapped = useCallback((valueOrSetter: React.SetStateAction<T>) => {
    setShadowValue((prevValue) => {
      const newValue = isSetter(valueOrSetter) ? valueOrSetter(prevValue) : valueOrSetter;
      if (fnEqualsRef.current(prevValue, newValue)) return prevValue;
      return newValue;
    });
  }, []);

  useEffect(() => {
    setShadowValue((prevValue) => {
      if (fnEqualsRef.current(prevValue, value)) return prevValue;
      log(id, 'ShadowState :: Original changed | Original → Shadow', value);
      return value;
    });
  }, [id, value]);

  const apply = useCallback(() => {
    setValue((prevValue) => {
      if (fnEqualsRef.current(prevValue, shadowValue)) return prevValue;
      log(id, 'ShadowState :: Apply | Original ← Shadow', shadowValue);
      return shadowValue;
    });
  }, [id, setValue, shadowValue]);

  const revert = useCallback(() => {
    setShadowValue((prevValue) => {
      if (fnEqualsRef.current(prevValue, value)) return prevValue;
      log(id, 'ShadowState :: Revert | Original → Shadow', value);
      return value;
    });
  }, [id, value]);

  // const isDirty = useCallback(() => !fnEqualsRef.current(value, shadowValue), [shadowValue, value]);
  const isDirty = useMemo(() => !fnEqualsRef.current(value, shadowValue), [shadowValue, value]);

  return [shadowValue, setShadowValueWrapped, { apply, revert, isDirty }] as const;
}
