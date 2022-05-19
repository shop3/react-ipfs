import React, { useEffect, useState } from 'react';
import type { IPFS, Options } from 'ipfs-core';
import context from './context';

type Props = {
  ipfsOptions?: Options;
};

const IPFSProvider: React.FC<Props> = ({ children, ipfsOptions }) => {
  const [ipfs, setIpfs] = useState<IPFS>();

  useEffect(() => {
    import('ipfs-core').then(({ create }) => create(ipfsOptions)).then((ipfs) => setIpfs(ipfs));
  }, [setIpfs, ipfsOptions]);

  return <context.Provider value={{ ipfs }}>{children}</context.Provider>;
};

export default IPFSProvider;
