import { renderHook, act } from '@testing-library/react-hooks';
import { useState } from 'react';
import { useShadowState } from './useShadowState';
import { FN_EQUALS_STRICT } from '../../utils/equals/equals';

function makeShadowHook<T>(initialValue: T, id: string) {
  const { result } = renderHook(() => {
    const [value, setValue] = useState(initialValue);
    const [shadowValue, setShadowValue, { apply, revert, isDirty }] = useShadowState(value, setValue, FN_EQUALS_STRICT, id);
    return { value, setValue, shadowValue, setShadowValue, apply, revert, isDirty };
  });
  return result;
}

describe('UseShadowState', () => {
  //
  test('initializes with original state', () => {
    const result = makeShadowHook('DEFAULT', 'A');
    expect(result.current.value).toBe('DEFAULT');
    expect(result.current.shadowValue).toBe('DEFAULT');
    expect(result.current.isDirty).toBeFalsy();
  });

  test('updates immediately when original state is changed', () => {
    const result = makeShadowHook('DEFAULT', 'B');

    act(() => result.current.setValue('NewValue'));
    expect(result.current.value).toBe('NewValue');
    expect(result.current.shadowValue).toBe('NewValue');
    expect(result.current.isDirty).toBeFalsy();
  });

  test('updates original state when [apply] is invoked', () => {
    const result = makeShadowHook('DEFAULT', 'C');

    act(() => result.current.setShadowValue('NewValue'));
    expect(result.current.value).toBe('DEFAULT');
    expect(result.current.shadowValue).toBe('NewValue');
    expect(result.current.isDirty).toBeTruthy();

    act(() => result.current.apply());
    expect(result.current.value).toBe('NewValue');
    expect(result.current.shadowValue).toBe('NewValue');
    expect(result.current.isDirty).toBeFalsy();
  });

  test('reverts to original state when [revert] is invoked', () => {
    const result = makeShadowHook('DEFAULT', 'C');

    act(() => result.current.setShadowValue('NewValue'));
    expect(result.current.value).toBe('DEFAULT');
    expect(result.current.shadowValue).toBe('NewValue');
    expect(result.current.isDirty).toBeTruthy();

    act(() => result.current.revert());
    expect(result.current.value).toBe('DEFAULT');
    expect(result.current.shadowValue).toBe('DEFAULT');
    expect(result.current.isDirty).toBeFalsy();
  });
});
