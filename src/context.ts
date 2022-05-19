import React from 'react';
import type { IPFS } from 'ipfs-core';

type IpfsContext = {
  ipfs?: IPFS;
};

const context = React.createContext<IpfsContext>({});

export default context;
