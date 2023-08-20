import { isUpdater, resolveValueOrUpdater } from './stateUpdater';

describe('State Updater', () => {
  //
  test('isUpdater', () => {
    expect(isUpdater(1)).toBeFalsy();
    expect(isUpdater('1')).toBeFalsy();
    expect(isUpdater(true)).toBeFalsy();
    expect(isUpdater(null)).toBeFalsy();
    expect(isUpdater(undefined)).toBeFalsy();
    expect(isUpdater([1, 2, 3])).toBeFalsy();
    expect(isUpdater({ hello: 'world' })).toBeFalsy();

    expect(isUpdater((value: number) => value + 1)).toBeTruthy();
  });

  test('resolveValueOrUpdater', () => {
    const fnGetValue = jest.fn(() => 'PREV_VALUE');

    expect(resolveValueOrUpdater('NEW_VALUE', fnGetValue)).toBe('NEW_VALUE');
    expect(fnGetValue).toHaveBeenCalledTimes(0);

    expect(resolveValueOrUpdater((prev: string) => `${prev}__NEW`, fnGetValue)).toBe('PREV_VALUE__NEW');
    expect(fnGetValue).toHaveBeenCalledTimes(1);
  });
});
