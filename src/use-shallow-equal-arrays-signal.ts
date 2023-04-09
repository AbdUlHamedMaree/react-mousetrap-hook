import { useEffect, useRef, useState } from 'react';
import { shallowEqualArrays } from 'shallow-equal';

export const useShallowEqualArraysSignal = (arr: any[]) => {
  const ref = useRef(arr);
  const [signal, setSignal] = useState(0);

  useEffect(() => {
    if (!shallowEqualArrays(ref.current, arr)) setSignal(v => v + 1);

    ref.current = arr;
  }, [arr]);

  return signal;
};
