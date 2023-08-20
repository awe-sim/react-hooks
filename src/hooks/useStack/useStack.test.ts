import { act } from 'react-test-renderer';
import { useStack } from './useStack';
import { renderHook } from '@testing-library/react-hooks';

function makeHook<T>(initialStack?: T[]) {
  return renderHook(() => {
    const [stack, setStack, { pop, push }] = useStack(initialStack);
    return { stack, setStack, pop, push };
  });
}

const INITIAL_LIST = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

describe('UseList', () => {
  //
  test('pop', () => {
    const { result } = makeHook(INITIAL_LIST);
    act(() => {
      const value = result.current.pop();
      expect(value).toBe(9);
    });
    expect(result.current.stack).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  test('push', () => {
    const { result } = makeHook(INITIAL_LIST);
    act(() => result.current.push(666));
    expect(result.current.stack).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 666]);
  });
});
