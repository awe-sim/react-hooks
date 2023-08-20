import { promisify } from './promisify';
import { sleep } from '../sleep/sleep';

describe('Promisify', () => {
  //
  test('initialization', () => {
    const { promise } = promisify<void>();
    const fnOnResolve = jest.fn();
    const fnOnReject = jest.fn();
    promise.then(fnOnResolve).catch(fnOnReject);
    expect(fnOnResolve).toHaveBeenCalledTimes(0);
    expect(fnOnReject).toHaveBeenCalledTimes(0);
  });

  test('resolve works', async () => {
    const { promise, resolve, reject } = promisify<void>();
    const fnOnResolve = jest.fn();
    const fnOnReject = jest.fn();
    promise.then(fnOnResolve).catch(fnOnReject);
    resolve();
    await sleep(0);
    expect(fnOnResolve).toHaveBeenCalledTimes(1);
    expect(fnOnReject).toHaveBeenCalledTimes(0);
    reject();
    await sleep(0);
    expect(fnOnResolve).toHaveBeenCalledTimes(1);
    expect(fnOnReject).toHaveBeenCalledTimes(0);
  });

  test('reject works', async () => {
    const { promise, resolve, reject } = promisify<void>();
    const fnOnResolve = jest.fn();
    const fnOnReject = jest.fn();
    promise.then(fnOnResolve).catch(fnOnReject);
    reject();
    await sleep(0);
    expect(fnOnResolve).toHaveBeenCalledTimes(0);
    expect(fnOnReject).toHaveBeenCalledTimes(1);
    resolve();
    await sleep(0);
    expect(fnOnResolve).toHaveBeenCalledTimes(0);
    expect(fnOnReject).toHaveBeenCalledTimes(1);
  });
});
