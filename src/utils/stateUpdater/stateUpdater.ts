export type FnUpdater<T> = (prevState: T) => T;

export function isUpdater<T>(valueOrUpdater: T | FnUpdater<T>): valueOrUpdater is FnUpdater<T> {
  return typeof valueOrUpdater === 'function';
}

export function resolveValueOrUpdater<T>(valueOrUpdater: T | FnUpdater<T>, fnGetValue: () => T): T {
  if (!isUpdater(valueOrUpdater)) return valueOrUpdater;
  return valueOrUpdater(fnGetValue());
}
