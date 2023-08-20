import { sleep } from './sleep';

describe('Sleep', () => {
  //
  test('sleep', async () => {
    const t0 = performance.now();
    await sleep(10);
    const t1 = performance.now();
    expect(t1 - t0).toBeGreaterThanOrEqual(10);
  });
});
