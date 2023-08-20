import { useCallback, useRef } from 'react';

function log(...args: any) {
  const [id, ...rest] = args;
  // eslint-disable-next-line no-console
  if (id) console.log(id, ...rest);
}

type FnResolve<T> = (value: T) => void;
type FnReject = (reason?: any) => void;

type PromisifyResult<T> = {
  promise: Promise<T>;
  resolve: FnResolve<T>;
  reject: FnReject;
};

function promisify<T>(): PromisifyResult<T> {
  let resolve: FnResolve<T> = () => {};
  let reject: FnReject = () => {};
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return { promise, resolve, reject };
}

type FnAction = () => void;

const DEFAULT_ACTION: FnAction = () => {};
const DEFAULT_DELAY = 0;
const DEFAULT_SKIP_IF_ALREADY_ENQUEUED = false;

/**
 * Creates a setTimeout
 */
export function useSetTimeout(initialCallback?: FnAction, initialDelay?: number, initialSkipIfAlreadyEnqueued?: boolean, id?: string) {
  //
  const refTimer = useRef<NodeJS.Timeout>();
  const refData = useRef(promisify<void>());
  const isScheduled = useCallback(() => !!refTimer.current, []);

  const schedule = useCallback(
    (overriddenCallback?: FnAction, overriddenDelay?: number, overriddenSkipIfAlreadyEnqueued?: boolean) => {
      if (refTimer.current) {
        if (overriddenSkipIfAlreadyEnqueued ?? initialSkipIfAlreadyEnqueued ?? DEFAULT_SKIP_IF_ALREADY_ENQUEUED) {
          log(id, 'useSetTimeout :: Already enqueued. Returning same promise...');
          return refData.current.promise;
        }
        log(id, 'useSetTimeout :: Cancelling...');
        clearTimeout(refTimer.current);
        refTimer.current = undefined;
      }
      refTimer.current = setTimeout(() => {
        log(id, 'useSetTimeout :: Executing and resolving promise...');
        (overriddenCallback ?? initialCallback ?? DEFAULT_ACTION)();
        refTimer.current = undefined;
        refData.current.resolve();
        refData.current = promisify<void>();
      }, overriddenDelay ?? initialDelay ?? DEFAULT_DELAY);
      log(id, 'useSetTimeout :: Enqueuing...');
      return refData.current.promise;
    },
    [initialCallback, initialDelay, initialSkipIfAlreadyEnqueued, id]
  );

  const cancel = useCallback(() => {
    if (!refTimer.current) return false;
    log(id, 'useSetTimeout :: Cancelling and rejecting promise...');
    clearTimeout(refTimer.current);
    refData.current.reject();
    refTimer.current = undefined;
    refData.current = promisify<void>();
    return true;
  }, [id]);

  return { schedule, cancel, isScheduled };
}
