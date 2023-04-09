# @mrii/react-mousetrap-hook

A simple wrapper on top of mousetrap to work with react.

## Installation

```bash
# yarn
yarn add @mrii/react-mousetrap-hook mousetrap

# npm
npm i @mrii/react-mousetrap-hook mousetrap
```

## Usage

bind events for specific components

```tsx
import type React from 'react';
import { useCallback } from 'react';
import { useMousetrap } from '@mrii/react-mousetrap-hook';

export const Component: React.FC = () => {
  // returns proxyRef from `@mrii/react-proxy-ref`
  const proxyRef = useMousetrap(
    ['enter', 'shift+enter'],
    useCallback(() => {
      // submit
    })
  );

  return (
    <>
      {/* the names doesn't matter, we are looping over them */}
      <input ref={proxyRef.email} name='email' />
      <input ref={proxyRef.password} name='password' />
    </>
  );
};
```

bind events to the document

```tsx
import type React from 'react';
import { useCallback } from 'react';
import { useMousetrap } from '@mrii/react-mousetrap-hook';

export const Component: React.FC = () => {
  // returns proxyRef from `@mrii/react-proxy-ref`
  useMousetrap(
    'ctrl+k',
    useCallback(() => {
      // open search
    }, []),
    'keyup'
  );

  //...
};
```

## Notes

- it's important to use `useCallback` when passing the callback to the hook, so you will save a lot of performance.
- there is no need to memoize the keys, because we are shallow comparing the changes.
