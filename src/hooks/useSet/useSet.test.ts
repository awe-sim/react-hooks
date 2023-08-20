import { renderHook } from '@testing-library/react-hooks';
import { useSet } from './useSet';
import { act } from 'react-test-renderer';

function makeHook<T>(initialSet?: Set<T>) {
  return renderHook(() => {
    const [set, setSet, { addOne, addAll, deleteOne, deleteAll, clear }] = useSet(initialSet);
    return { set, setSet, addOne, addAll, deleteOne, deleteAll, clear };
  });
}

const INITIAL_SET = new Set([1, 2, 3, 4, 5]);

describe('UseSet', () => {
  //
  test('addOne', () => {
    const { result } = makeHook(INITIAL_SET);
    act(() => {
      const value = result.current.addOne(666);
      expect(value).toEqual(new Set([1, 2, 3, 4, 5, 666]));
    });
    expect(result.current.set).toEqual(new Set([1, 2, 3, 4, 5, 666]));
  });

  test('addAll', () => {
    const { result } = makeHook(INITIAL_SET);
    act(() => {
      const value = result.current.addAll(666, 777, 888);
      expect(value).toEqual(new Set([1, 2, 3, 4, 5, 666, 777, 888]));
    });
    expect(result.current.set).toEqual(new Set([1, 2, 3, 4, 5, 666, 777, 888]));
  });

  test('deleteOne', () => {
    const { result } = makeHook(INITIAL_SET);
    act(() => {
      const value = result.current.deleteOne(666);
      expect(value).toBeFalsy();
    });
    expect(result.current.set).toBe(INITIAL_SET);
    act(() => {
      const value = result.current.deleteOne(3);
      expect(value).toBeTruthy();
    });
    expect(result.current.set).toEqual(new Set([1, 2, 4, 5]));
  });

  test('deleteAll', () => {
    const { result } = makeHook(INITIAL_SET);
    act(() => result.current.deleteAll(666, 1, 5));
    expect(result.current.set).toEqual(new Set([2, 3, 4]));
  });

  test('clear', () => {
    const { result } = makeHook(INITIAL_SET);
    act(() => result.current.clear());
    expect(result.current.set).toEqual(new Set());
  });
});
