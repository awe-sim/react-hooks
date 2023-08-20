import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useSetTimeout } from './useSetTimeout';
import { sleep } from '../../utils/sleep/sleep';

function makeHook1(callback: () => void, delay: number, skipIfAlreadyEnqueued: boolean, id: string) {
  return renderHook(() => useSetTimeout(callback, delay, skipIfAlreadyEnqueued, id));
}
function makeHook2(id: string) {
  return renderHook(() => useSetTimeout(undefined, undefined, undefined, id));
}

describe('useTimedAction | V1 (skip)', () => {
  it('initialization', () => {
    const callback = jest.fn();
    const { result } = makeHook1(callback, 50, true, 'A');

    expect(result.current.isScheduled()).toBeFalsy();
    expect(callback).not.toHaveBeenCalled();
    expect(result.current.cancel()).toBeFalsy();
  });

  it('enqueue once', async () => {
    const callback = jest.fn();
    const { result } = makeHook1(callback, 50, true, 'B');
    const oldSchedule = result.current.schedule;
    const oldCancel = result.current.cancel;
    const oldIsScheduled = result.current.isScheduled;

    const promise = act(() => result.current.schedule());
    expect(result.current.isScheduled()).toBeTruthy();
    expect(callback).toHaveBeenCalledTimes(0);

    await promise;
    expect(result.current.isScheduled()).toBeFalsy();
    expect(callback).toHaveBeenCalledTimes(1);

    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);
  });

  it('cancel', async () => {
    const callback = jest.fn();
    const { result } = makeHook1(callback, 50, true, 'C');
    const oldSchedule = result.current.schedule;
    const oldCancel = result.current.cancel;
    const oldIsScheduled = result.current.isScheduled;

    const promise = act(() => {
      const _promise = result.current.schedule();
      expect(result.current.isScheduled()).toBeTruthy();
      expect(callback).toHaveBeenCalledTimes(0);
      result.current.cancel();
      return _promise;
    });

    await expect(promise).rejects.toEqual(undefined);
    expect(result.current.isScheduled()).toBeFalsy();
    expect(callback).toHaveBeenCalledTimes(0);
    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);

    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);
  });

  it('enqueue repeatedly', async () => {
    const callback = jest.fn();
    const { result } = makeHook1(callback, 50, true, 'D');
    const oldSchedule = result.current.schedule;
    const oldCancel = result.current.cancel;
    const oldIsScheduled = result.current.isScheduled;

    await act(async () => {
      const promise1 = result.current.schedule();
      const promise2 = result.current.schedule();
      const promise3 = result.current.schedule();
      expect(promise1).toBe(promise2);
      expect(promise1).toBe(promise3);
      expect(result.current.isScheduled()).toBeTruthy();
      expect(callback).toHaveBeenCalledTimes(0);

      await Promise.all([promise1, promise2, promise3]);
      expect(result.current.isScheduled()).toBeFalsy();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);
  });

  it('enqueue repeatedly timing', async () => {
    const callback = jest.fn();
    const { result } = makeHook1(callback, 50, true, 'E');
    const oldSchedule = result.current.schedule;
    const oldCancel = result.current.cancel;
    const oldIsScheduled = result.current.isScheduled;

    await act(async () => {
      result.current.schedule();
      await sleep(30);
      result.current.schedule();
      await sleep(30);
      expect(result.current.isScheduled()).toBeFalsy();
      expect(callback).toHaveBeenCalledTimes(1);
      await sleep(50);
      expect(result.current.isScheduled()).toBeFalsy();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);
  });
});

describe('useTimedAction | V1 (no skip)', () => {
  it('initialization', () => {
    const callback = jest.fn();
    const { result } = makeHook1(callback, 50, false, 'F');
    expect(result.current.isScheduled()).toBeFalsy();
    expect(callback).not.toHaveBeenCalled();
    expect(result.current.cancel()).toBeFalsy();
  });

  it('enqueue once', async () => {
    const callback = jest.fn();
    const { result } = makeHook1(callback, 50, false, 'G');
    const oldSchedule = result.current.schedule;
    const oldCancel = result.current.cancel;
    const oldIsScheduled = result.current.isScheduled;

    const promise = act(() => result.current.schedule());
    expect(result.current.isScheduled()).toBeTruthy();
    expect(callback).toHaveBeenCalledTimes(0);

    await promise;
    expect(result.current.isScheduled()).toBeFalsy();
    expect(callback).toHaveBeenCalledTimes(1);

    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);
  });

  it('cancel', async () => {
    const callback = jest.fn();
    const { result } = makeHook1(callback, 50, false, 'H');
    const oldSchedule = result.current.schedule;
    const oldCancel = result.current.cancel;
    const oldIsScheduled = result.current.isScheduled;

    const promise = act(() => {
      const _promise = result.current.schedule();
      expect(result.current.isScheduled()).toBeTruthy();
      expect(callback).toHaveBeenCalledTimes(0);
      result.current.cancel();
      return _promise;
    });

    await expect(promise).rejects.toEqual(undefined);
    expect(result.current.isScheduled()).toBeFalsy();
    expect(callback).toHaveBeenCalledTimes(0);

    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);
  });

  it('enqueue repeatedly', async () => {
    const callback = jest.fn();
    const { result } = makeHook1(callback, 50, false, 'I');
    const oldSchedule = result.current.schedule;
    const oldCancel = result.current.cancel;
    const oldIsScheduled = result.current.isScheduled;

    await act(async () => {
      const promise1 = result.current.schedule();
      const promise2 = result.current.schedule();
      const promise3 = result.current.schedule();
      expect(promise1).toBe(promise2);
      expect(promise1).toBe(promise3);
      expect(result.current.isScheduled()).toBeTruthy();
      expect(callback).toHaveBeenCalledTimes(0);

      await Promise.all([promise1, promise2, promise3]);
      expect(result.current.isScheduled()).toBeFalsy();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);
  });

  it('enqueue repeatedly timing', async () => {
    const callback = jest.fn();
    const { result } = makeHook1(callback, 50, false, 'J');
    const oldSchedule = result.current.schedule;
    const oldCancel = result.current.cancel;
    const oldIsScheduled = result.current.isScheduled;

    await act(async () => {
      result.current.schedule();
      await sleep(30);
      result.current.schedule();
      await sleep(30);
      result.current.schedule();
      await sleep(30);
      result.current.schedule();
      await sleep(30);
      expect(result.current.isScheduled()).toBeTruthy();
      expect(callback).toHaveBeenCalledTimes(0);
      await sleep(50);
      expect(result.current.isScheduled()).toBeFalsy();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);
  });
});

describe('useTimedAction | V2 (skip)', () => {
  it('initialization', () => {
    const { result } = makeHook2('K');

    expect(result.current.isScheduled()).toBeFalsy();
    expect(result.current.cancel()).toBeFalsy();
  });

  it('enqueue once', async () => {
    const callback = jest.fn();
    const { result } = makeHook2('L');
    const oldSchedule = result.current.schedule;
    const oldCancel = result.current.cancel;
    const oldIsScheduled = result.current.isScheduled;

    const promise = act(() => result.current.schedule(callback, 50, true));
    expect(result.current.isScheduled()).toBeTruthy();
    expect(callback).toHaveBeenCalledTimes(0);

    await promise;
    expect(result.current.isScheduled()).toBeFalsy();
    expect(callback).toHaveBeenCalledTimes(1);

    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);
  });

  it('cancel', async () => {
    const callback = jest.fn();
    const { result } = makeHook2('M');
    const oldSchedule = result.current.schedule;
    const oldCancel = result.current.cancel;
    const oldIsScheduled = result.current.isScheduled;

    const promise = act(() => {
      const _promise = result.current.schedule(callback, 50, true);
      expect(result.current.isScheduled()).toBeTruthy();
      expect(callback).toHaveBeenCalledTimes(0);
      result.current.cancel();
      return _promise;
    });

    await expect(promise).rejects.toEqual(undefined);
    expect(result.current.isScheduled()).toBeFalsy();
    expect(callback).toHaveBeenCalledTimes(0);

    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);
  });

  it('enqueue repeatedly', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();
    const { result } = makeHook2('N');
    const oldSchedule = result.current.schedule;
    const oldCancel = result.current.cancel;
    const oldIsScheduled = result.current.isScheduled;

    await act(async () => {
      const promise1 = result.current.schedule(callback1, 50, true);
      const promise2 = result.current.schedule(callback2, 50, true);
      const promise3 = result.current.schedule(callback3, 50, true);
      expect(promise1).toBe(promise2);
      expect(promise1).toBe(promise3);
      expect(result.current.isScheduled()).toBeTruthy();
      expect(callback1).toHaveBeenCalledTimes(0);
      expect(callback2).toHaveBeenCalledTimes(0);
      expect(callback3).toHaveBeenCalledTimes(0);

      await Promise.all([promise1, promise2, promise3]);
      expect(result.current.isScheduled()).toBeFalsy();
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(0);
      expect(callback3).toHaveBeenCalledTimes(0);
    });

    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);
  });

  it('enqueue repeatedly timing', async () => {
    const callback = jest.fn();
    const { result } = makeHook2('O');
    const oldSchedule = result.current.schedule;
    const oldCancel = result.current.cancel;
    const oldIsScheduled = result.current.isScheduled;

    await act(async () => {
      result.current.schedule(callback, 50, true);
      await sleep(30);
      result.current.schedule(callback, 50, true);
      await sleep(30);
      expect(result.current.isScheduled()).toBeFalsy();
      expect(callback).toHaveBeenCalledTimes(1);
      await sleep(50);
      expect(result.current.isScheduled()).toBeFalsy();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);
  });
});

describe('useTimedAction | V2 (no skip)', () => {
  it('initialization', () => {
    const { result } = makeHook2('P');

    expect(result.current.isScheduled()).toBeFalsy();
    expect(result.current.cancel()).toBeFalsy();
  });

  it('enqueue once', async () => {
    const callback = jest.fn();
    const { result } = makeHook2('Q');
    const oldSchedule = result.current.schedule;
    const oldCancel = result.current.cancel;
    const oldIsScheduled = result.current.isScheduled;

    const promise = act(() => result.current.schedule(callback, 50, false));
    expect(result.current.isScheduled()).toBeTruthy();
    expect(callback).toHaveBeenCalledTimes(0);

    await promise;
    expect(result.current.isScheduled()).toBeFalsy();
    expect(callback).toHaveBeenCalledTimes(1);

    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);
  });

  it('cancel', async () => {
    const callback = jest.fn();
    const { result } = makeHook2('R');
    const oldSchedule = result.current.schedule;
    const oldCancel = result.current.cancel;
    const oldIsScheduled = result.current.isScheduled;

    const promise = act(() => {
      const _promise = result.current.schedule(callback, 50, false);
      expect(result.current.isScheduled()).toBeTruthy();
      expect(callback).toHaveBeenCalledTimes(0);
      result.current.cancel();
      return _promise;
    });

    await expect(promise).rejects.toEqual(undefined);
    expect(result.current.isScheduled()).toBeFalsy();
    expect(callback).toHaveBeenCalledTimes(0);

    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);
  });

  it('enqueue repeatedly', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();
    const { result } = makeHook2('S');
    const oldSchedule = result.current.schedule;
    const oldCancel = result.current.cancel;
    const oldIsScheduled = result.current.isScheduled;

    await act(async () => {
      const promise1 = result.current.schedule(callback1, 50, false);
      const promise2 = result.current.schedule(callback2, 50, false);
      const promise3 = result.current.schedule(callback3, 50, false);
      expect(promise1).toBe(promise2);
      expect(promise1).toBe(promise3);
      expect(result.current.isScheduled()).toBeTruthy();
      expect(callback1).toHaveBeenCalledTimes(0);
      expect(callback2).toHaveBeenCalledTimes(0);
      expect(callback3).toHaveBeenCalledTimes(0);

      await Promise.all([promise1, promise2, promise3]);
      expect(result.current.isScheduled()).toBeFalsy();
      expect(callback1).toHaveBeenCalledTimes(0);
      expect(callback2).toHaveBeenCalledTimes(0);
      expect(callback3).toHaveBeenCalledTimes(1);
    });

    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);
  });

  it('enqueue repeatedly timing', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();
    const callback4 = jest.fn();
    const { result } = makeHook2('T');
    const oldSchedule = result.current.schedule;
    const oldCancel = result.current.cancel;
    const oldIsScheduled = result.current.isScheduled;

    await act(async () => {
      result.current.schedule(callback1, 50, false);
      await sleep(30);
      result.current.schedule(callback2, 50, false);
      await sleep(30);
      result.current.schedule(callback3, 50, false);
      await sleep(30);
      result.current.schedule(callback4, 50, false);
      await sleep(30);
      expect(result.current.isScheduled()).toBeTruthy();
      expect(callback1).toHaveBeenCalledTimes(0);
      expect(callback2).toHaveBeenCalledTimes(0);
      expect(callback3).toHaveBeenCalledTimes(0);
      expect(callback4).toHaveBeenCalledTimes(0);
      await sleep(50);
      expect(result.current.isScheduled()).toBeFalsy();
      expect(callback1).toHaveBeenCalledTimes(0);
      expect(callback2).toHaveBeenCalledTimes(0);
      expect(callback3).toHaveBeenCalledTimes(0);
      expect(callback4).toHaveBeenCalledTimes(1);
    });

    expect(result.current.schedule).toBe(oldSchedule);
    expect(result.current.cancel).toBe(oldCancel);
    expect(result.current.isScheduled).toBe(oldIsScheduled);
  });
});
