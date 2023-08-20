export type FnEquals<T> = (a: T, b: T) => boolean;

export const FN_EQUALS_STRICT: FnEquals<any> = (a, b) => a === b;
export const FN_EQUALS_DEEP: FnEquals<any> = (a, b) => JSON.stringify(a) === JSON.stringify(b);
