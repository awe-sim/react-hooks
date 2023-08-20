import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSetTimeout } from '../useSetTimeout/useSetTimeout';

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
 * Creates a corresponding LeadingState for the given InputState such that:
 * 1. Changes to LeadingState propagate to InputState after a set delay.
 * 2. Changes to InputState immediately propagate to LeadingState.
 * 3. Calling [apply] immediately propagates changes to InputState.
 * 4. Calling [revert] reverts LeadingState back to InputState.
 */
export function useLeadingState<T>(value: T, setValue: React.Dispatch<React.SetStateAction<T>>, delay: number, fnEquals: FnEquals<T>, id?: string) {
  const [leadingValue, setLeadingValue] = useState(value);
  const { schedule, cancel } = useSetTimeout(undefined, delay, false, 'LeadingStateTimeout');
  const fnEqualsRef = useRef(fnEquals);

  const setLeadingValueWrapped = useCallback(
    (valueOrSetter: React.SetStateAction<T>) => {
      setLeadingValue((prevValue) => {
        const newValue = isSetter(valueOrSetter) ? valueOrSetter(prevValue) : valueOrSetter;
        if (fnEqualsRef.current(prevValue, newValue)) return prevValue;
        schedule(() => setValue(newValue));
        return newValue;
      });
    },
    [schedule, setValue]
  );

  useEffect(() => {
    setLeadingValue((prevValue) => {
      if (fnEqualsRef.current(prevValue, value)) return prevValue;
      log(id, 'LeadingState :: Original changed | Original → Leading', value);
      cancel();
      return value;
    });
  }, [cancel, id, value]);

  const apply = useCallback(() => {
    setValue((prevValue) => {
      if (fnEqualsRef.current(prevValue, leadingValue)) return prevValue;
      log(id, 'LeadingState :: Apply | Original ← Leading', leadingValue);
      return leadingValue;
    });
  }, [id, setValue, leadingValue]);

  const revert = useCallback(() => {
    setLeadingValue((prevValue) => {
      if (fnEqualsRef.current(prevValue, value)) return prevValue;
      log(id, 'LeadingState :: Revert | Original → Leading', value);
      return value;
    });
  }, [id, value]);

  const isDirty = useMemo(() => !fnEqualsRef.current(value, leadingValue), [leadingValue, value]);

  return [leadingValue, setLeadingValueWrapped, { apply, revert, isDirty }] as const;
}
