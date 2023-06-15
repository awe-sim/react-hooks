import { useCallback, useEffect, useState } from 'react';

function log(...args: any) {
  // eslint-disable-next-line no-console
  if (args?.[0]) console.log(...args);
}

/**
 * Creates a corresponding ShadowState for the given InputState such that:
 * 1. Changes to ShadowState never propagate to InputState.
 * 2. Changes to InputState immediately propagate to ShadowState.
 * 3. Calling [apply] immediately propagates changes to InputState.
 * 4. Calling [revert] reverts ShadowState back to InputState.
 */
export function useShadowState<T>(value: T, setValue: React.Dispatch<T>, id?: string) {
  const [shadowValue, setShadowState] = useState(value);
  const [isDirty, setDirty] = useState(false);

  const setShadowStateWrapped = (newValue: React.SetStateAction<T>) => {
    setShadowState(newValue);
    setDirty(true);
  };

  useEffect(() => {
    log(id, 'ShadowState :: Original changed | Original → Shadow', value);
    setShadowState(value);
    setDirty(false);
  }, [id, value]);

  const apply = useCallback(() => {
    log(id, 'ShadowState :: Apply | Original ← Shadow', shadowValue);
    setValue(shadowValue);
    setDirty(false);
  }, [id, setValue, shadowValue]);

  const revert = useCallback(() => {
    log(id, 'ShadowState :: Revert | Original → Shadow', value);
    setShadowState(value);
    setDirty(false);
  }, [id, value]);

  return [shadowValue, setShadowStateWrapped, { apply, revert, isDirty }] as const;
}
