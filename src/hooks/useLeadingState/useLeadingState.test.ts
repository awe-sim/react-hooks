import { renderHook, act } from '@testing-library/react-hooks';
import { useState } from 'react';
import { useLeadingState } from './useLeadingState';
import { FN_EQUALS_STRICT } from '../../utils/equals/equals';
import { sleep } from '../../utils/sleep/sleep';

function makeLeadingHook<T>(initialValue: T, id: string) {
  const { result } = renderHook(() => {
    const [value, setValue] = useState(initialValue);
    const [leadingValue, setLeadingValue, { apply, revert, isDirty }] = useLeadingState(value, setValue, 10, FN_EQUALS_STRICT, id);
    return { value, setValue, leadingValue, setLeadingValue, apply, revert, isDirty };
  });
  return result;
}

describe('UseLeadingState', () => {
  //
  test('initializes with original state', () => {
    const result = makeLeadingHook('DEFAULT', 'A');
    expect(result.current.value).toBe('DEFAULT');
    expect(result.current.leadingValue).toBe('DEFAULT');
    expect(result.current.isDirty).toBeFalsy();
  });

  test('updates immediately when original state is changed', () => {
    const result = makeLeadingHook('DEFAULT', 'B');

    act(() => result.current.setValue('NewValue'));
    expect(result.current.value).toBe('NewValue');
    expect(result.current.leadingValue).toBe('NewValue');
    expect(result.current.isDirty).toBeFalsy();
  });

  test('updates after delay when leading state is changed', async () => {
    const result = makeLeadingHook('DEFAULT', 'B');

    act(() => result.current.setLeadingValue('NewValue'));
    expect(result.current.value).toBe('DEFAULT');
    expect(result.current.leadingValue).toBe('NewValue');
    expect(result.current.isDirty).toBeTruthy();

    await act(() => sleep(10));
    expect(result.current.value).toBe('NewValue');
    expect(result.current.leadingValue).toBe('NewValue');
    expect(result.current.isDirty).toBeFalsy();
  });

  test('updates original state when [apply] is invoked', () => {
    const result = makeLeadingHook('DEFAULT', 'C');

    act(() => result.current.setLeadingValue('NewValue'));
    expect(result.current.value).toBe('DEFAULT');
    expect(result.current.leadingValue).toBe('NewValue');
    expect(result.current.isDirty).toBeTruthy();

    act(() => result.current.apply());
    expect(result.current.value).toBe('NewValue');
    expect(result.current.leadingValue).toBe('NewValue');
    expect(result.current.isDirty).toBeFalsy();
  });

  test('reverts to original state when [revert] is invoked', () => {
    const result = makeLeadingHook('DEFAULT', 'C');

    act(() => result.current.setLeadingValue('NewValue'));
    expect(result.current.value).toBe('DEFAULT');
    expect(result.current.leadingValue).toBe('NewValue');
    expect(result.current.isDirty).toBeTruthy();

    act(() => result.current.revert());
    expect(result.current.value).toBe('DEFAULT');
    expect(result.current.leadingValue).toBe('DEFAULT');
    expect(result.current.isDirty).toBeFalsy();
  });
});
