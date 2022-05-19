import { useContext } from 'react';
import context from './context';

const useIPFS = () => {
  return useContext(context).ipfs;
};

export default useIPFS;
