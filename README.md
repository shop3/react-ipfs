# React IPFS Provider

IPFS provider for a react application.

## Installation

```bash
npm install --save @shop3/react-ipfs
```

## Usage

```js
import React, { useEffect } from 'react';
import { IPFSProvider, useIPFS } from '@shop3/react-ipfs';

const App = () => {
  return (
    <IPFSProvider>
      {/* app here */}
    </IPFSProvider>
  )
}

const Example = () => {
  const ipfs = useIPFS();

  useEffect(() => {
    if (ipfs) {
      // use ipfs here
    }
  }, [ipfs]);
}
```

# Development

## Installation

```bash
npm install

npm run husky:install
```

## Development

```bash
npm run develop
```
