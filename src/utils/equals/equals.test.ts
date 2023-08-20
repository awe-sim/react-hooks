import { FN_EQUALS_DEEP, FN_EQUALS_STRICT } from './equals';

describe('Equals', () => {
  //
  test('equalsStrict', () => {
    expect(FN_EQUALS_STRICT(1, 1)).toBeTruthy();
    expect(FN_EQUALS_STRICT('1', '1')).toBeTruthy();
    expect(FN_EQUALS_STRICT(true, true)).toBeTruthy();
    expect(FN_EQUALS_STRICT(null, null)).toBeTruthy();
    expect(FN_EQUALS_STRICT(undefined, undefined)).toBeTruthy();

    expect(FN_EQUALS_STRICT(1, 2)).toBeFalsy();
    expect(FN_EQUALS_STRICT('1', '2')).toBeFalsy();
    expect(FN_EQUALS_STRICT(true, false)).toBeFalsy();
    expect(FN_EQUALS_STRICT(null, 1)).toBeFalsy();
    expect(FN_EQUALS_STRICT(undefined, 1)).toBeFalsy();

    const O1 = {};
    const O2 = { hello: 'world' };
    const L1: number[] = [];
    const L2 = [1, 2, 3];
    expect(FN_EQUALS_STRICT({}, {})).toBeFalsy();
    expect(FN_EQUALS_STRICT(O1, O1)).toBeTruthy();
    expect(FN_EQUALS_STRICT(O1, O2)).toBeFalsy();
    expect(FN_EQUALS_STRICT([], [])).toBeFalsy();
    expect(FN_EQUALS_STRICT(L1, L1)).toBeTruthy();
    expect(FN_EQUALS_STRICT(L1, L2)).toBeFalsy();
  });

  test('equalsDeep', () => {
    expect(FN_EQUALS_DEEP(1, 1)).toBeTruthy();
    expect(FN_EQUALS_DEEP('1', '1')).toBeTruthy();
    expect(FN_EQUALS_DEEP(true, true)).toBeTruthy();
    expect(FN_EQUALS_DEEP(null, null)).toBeTruthy();
    expect(FN_EQUALS_DEEP(undefined, undefined)).toBeTruthy();

    expect(FN_EQUALS_DEEP(1, 2)).toBeFalsy();
    expect(FN_EQUALS_DEEP('1', '2')).toBeFalsy();
    expect(FN_EQUALS_DEEP(true, false)).toBeFalsy();
    expect(FN_EQUALS_DEEP(null, 1)).toBeFalsy();
    expect(FN_EQUALS_DEEP(undefined, 1)).toBeFalsy();

    const O1 = {};
    const O2 = { hello: 'world' };
    const L1: number[] = [];
    const L2 = [1, 2, 3];
    expect(FN_EQUALS_DEEP({}, {})).toBeTruthy();
    expect(FN_EQUALS_DEEP(O1, O1)).toBeTruthy();
    expect(FN_EQUALS_DEEP(O1, O2)).toBeFalsy();
    expect(FN_EQUALS_DEEP([], [])).toBeTruthy();
    expect(FN_EQUALS_DEEP(L1, L1)).toBeTruthy();
    expect(FN_EQUALS_DEEP(L1, L2)).toBeFalsy();
  });
});
