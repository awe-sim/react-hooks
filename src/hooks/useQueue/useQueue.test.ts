import { act } from 'react-test-renderer';
import { useQueue } from './useQueue';
import { renderHook } from '@testing-library/react-hooks';

function makeHook<T>(initialQueue?: T[]) {
  return renderHook(() => {
    const [queue, setQueue, { enqueue, dequeue }] = useQueue(initialQueue);
    return { queue, setQueue, enqueue, dequeue };
  });
}

const INITIAL_LIST = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

describe('UseList', () => {
  //
  test('enqueue', () => {
    const { result } = makeHook(INITIAL_LIST);
    act(() => result.current.enqueue(666));
    expect(result.current.queue).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 666]);
  });

  test('dequeue', () => {
    const { result } = makeHook(INITIAL_LIST);
    act(() => {
      const value = result.current.dequeue();
      expect(value).toBe(0);
    });
    expect(result.current.queue).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
