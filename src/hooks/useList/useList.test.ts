import { act } from 'react-test-renderer';
import { useList } from './useList';
import { renderHook } from '@testing-library/react-hooks';

function makeHook<T>(initialList?: T[]) {
  return renderHook(() => {
    const [list, setList, { fill, pop, push, reverse, shift, sort, splice, unshift }] = useList(initialList);
    return { list, setList, fill, pop, push, reverse, shift, sort, splice, unshift };
  });
}

const INITIAL_LIST = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

describe('UseList', () => {
  //
  test('fill', () => {
    const { result } = makeHook(INITIAL_LIST);
    act(() => result.current.fill(666, 3, 6));
    expect(result.current.list).toEqual([0, 1, 2, 666, 666, 666, 6, 7, 8, 9]);
  });

  test('pop', () => {
    const { result } = makeHook(INITIAL_LIST);
    act(() => {
      const value = result.current.pop();
      expect(value).toBe(9);
    });
    expect(result.current.list).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  test('push', () => {
    const { result } = makeHook(INITIAL_LIST);
    act(() => result.current.push(666));
    expect(result.current.list).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 666]);
  });

  test('reverse', () => {
    const { result } = makeHook(INITIAL_LIST);
    act(() => {
      const value = result.current.reverse();
      expect(value).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    });
    expect(result.current.list).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
  });

  test('shift', () => {
    const { result } = makeHook(INITIAL_LIST);
    act(() => {
      const value = result.current.shift();
      expect(value).toBe(0);
    });
    expect(result.current.list).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('splice', () => {
    const { result } = makeHook(INITIAL_LIST);
    act(() => {
      const value = result.current.splice(3, 3, 666, 777, 888);
      expect(value).toEqual([3, 4, 5]);
    });
    expect(result.current.list).toEqual([0, 1, 2, 666, 777, 888, 6, 7, 8, 9]);
  });

  test('unshift', () => {
    const { result } = makeHook(INITIAL_LIST);
    act(() => {
      const value = result.current.unshift(666);
      expect(value).toBe(11);
    });
    expect(result.current.list).toEqual([666, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
