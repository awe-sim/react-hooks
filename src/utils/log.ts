export function log(...args: any) {
  const [id, ...rest] = args;
  // eslint-disable-next-line no-console
  if (id) console.log(`[${id}]`, ...rest);
}
