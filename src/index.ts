import { useProxyRef } from '@mrii/react-proxy-ref';
import Mousetrap from 'mousetrap';
import { useEffect, useMemo } from 'react';
import { useShallowEqualArraysSignal } from './use-shallow-equal-arrays-signal';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const uselessFunction = () => {};
const emptyArray: string[] = [];

export type MousetrapCallback = (
  e: Mousetrap.ExtendedKeyboardEvent,
  combo: string
) => void;

export const useMousetrap = (
  keys: string | string[] = emptyArray,
  callback: MousetrapCallback = uselessFunction,
  action?: string
) => {
  const proxyRef = useProxyRef<Element | undefined>(undefined);

  const memoKeys = useMemo(() => (typeof keys === 'string' ? [keys] : keys), [keys]);
  const keysSignal = useShallowEqualArraysSignal(memoKeys);

  useEffect(() => {
    const elements = Object.values(proxyRef);

    const traps = elements.map(element =>
      new Mousetrap(element.current).bind(memoKeys, callback, action)
    );

    return () => traps.forEach(trap => trap.unbind(memoKeys, action));
  }, [action, callback, keysSignal, proxyRef]);

  return proxyRef;
};
