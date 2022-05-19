import React, { ButtonHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { IPFSProvider, useIPFS } from '../src';

const Example = () => {
  const ipfs = useIPFS();
  const [files, setFiles] = useState<string[]>([]);
  const [refresh, setRefresh] = useState<boolean>(true);
  const inputFileRef = useRef(null);

  useEffect(() => {
    async function listFiles() {
      if (ipfs && refresh) {
        const newFiles = new Set<string>();
        for await (const entry of ipfs.files.ls('/')) {
          if (entry.type === 'file') {
            const chunks = [];
            for await (const chunk of ipfs.files.read('/' + entry.name)) {
              chunks.push(chunk);
            }
            const fileUrl = URL.createObjectURL(new Blob(chunks));
            newFiles.add(fileUrl);
          }
        }
        setFiles(Array.from(newFiles));
        setRefresh(false);
      }
    }
    listFiles();
  }, [ipfs, setFiles, refresh]);

  const handleClickUploadFile = useCallback(async () => {
    if (inputFileRef.current) {
      (inputFileRef.current as any).click();
    }
  }, [inputFileRef]);

  const handleClickClearFiles = useCallback(async () => {
    if (ipfs) {
      for await (const entry of ipfs.files.ls('/')) {
        if (entry.type === 'file') {
          await ipfs.files.rm('/' + entry.name);
        }
      }
      setRefresh(true);
    }
  }, [ipfs, setRefresh]);

  const handleFileUpload = useCallback(
    async (e) => {
      const file: File = e.target.files[0];
      if (ipfs && file) {
        await ipfs.files.write('/' + file.name, file, { create: true });
        if (inputFileRef.current) {
          (inputFileRef.current as any).value = null;
        }
        setRefresh(true);
      }
    },
    [ipfs, setRefresh, inputFileRef]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {!ipfs && <p>loading IPFS</p>}
      {ipfs && (
        <>
          {files && files.length > 0 && (
            <div style={{ display: 'flex' }}>
              {files.map((file, index) => (
                <img
                  key={index}
                  src={file}
                  style={{
                    display: 'block',
                    maxWidth: '20rem',
                    maxHeight: '18rem',
                    width: 'auto',
                    height: 'auto',
                  }}
                />
              ))}
            </div>
          )}
          <div style={{ display: 'flex' }}>
            <input ref={inputFileRef} type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
            <Button onClick={handleClickUploadFile}>Upload File</Button>
            <Button onClick={handleClickClearFiles}>Clear Files</Button>
          </div>
        </>
      )}
    </div>
  );
};

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return (
    <button {...props} style={{ width: '8rem', height: '3rem', margin: '1rem' }}>
      {children}
    </button>
  );
};

const App: React.FC = () => {
  return (
    <main>
      <IPFSProvider>
        <Example />
      </IPFSProvider>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
