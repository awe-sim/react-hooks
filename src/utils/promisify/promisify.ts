export type FnResolve<T> = (value: T | PromiseLike<T>) => void;
export type FnReject = (reason?: any) => void;

type PromisifyResult<T> = {
  promise: Promise<T>;
  resolve: FnResolve<T>;
  reject: FnReject;
};

/**
 * Creates a promise and returns it along with its resolve and reject methods.
 */
export function promisify<T>(): PromisifyResult<T> {
  let resolve: FnResolve<T> = () => {};
  let reject: FnReject = () => {};
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return { promise, resolve, reject };
}
