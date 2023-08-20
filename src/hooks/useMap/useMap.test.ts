import { renderHook } from '@testing-library/react-hooks';
import { useMap } from './useMap';
import { act } from 'react-test-renderer';

function makeHook<K, T>(initialMap?: Map<K, T>) {
  return renderHook(() => {
    const [map, setMap, { set, clear }] = useMap(initialMap);
    return { map, setMap, set, clear };
  });
}

const INITIAL_MAP = new Map([
  ['A', 1],
  ['B', 2],
  ['C', 3]
]);

describe('UseMap', () => {
  //
  test('set', () => {
    const { result } = makeHook(INITIAL_MAP);
    act(() => {
      const value = result.current.set('X', 666);
      expect(value).toEqual(
        new Map([
          ['A', 1],
          ['B', 2],
          ['C', 3],
          ['X', 666]
        ])
      );
    });
    expect(result.current.map).toEqual(
      new Map([
        ['A', 1],
        ['B', 2],
        ['C', 3],
        ['X', 666]
      ])
    );
  });

  test('clear', () => {
    const { result } = makeHook(INITIAL_MAP);
    act(() => result.current.clear());
    expect(result.current.map).toEqual(new Map());
  });
});
