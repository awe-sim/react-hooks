import { RenderHookOptions, RenderHookResult, renderHook } from '@testing-library/react-hooks';

/**
 * Renders a hook in unit tests with added functionality to compute number of render cycles.
 */
export function renderHookWithCount<TProps, TResult>(callback: (_props?: TProps) => TResult, props?: TProps, options?: RenderHookOptions<TProps | undefined>): RenderHookResult<TProps, TResult> & { getRenderCount: () => number } {
  let renderCount = 0;
  const getRenderCount = () => renderCount;
  const result = renderHook(() => {
    ++renderCount;
    return callback(props);
  }, options);
  return { getRenderCount, ...result };
}
