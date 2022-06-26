import React, {
  useState, useMemo, useCallback, startTransition,
} from 'react';

import SidebarMenu from './components/SidebarMenu';
import FilesList from './components/FilesList';
import type { File } from './typings/file';

import styles from './App.module.scss';

const fs = window.require('fs');
const pathModule = window.require('path');

const { app } = window.require('@electron/remote');

const App: React.FC = () => {
  const [path, setPath] = useState<string>(app.getPath('documents'));
  const [backHistory, setBackHistory] = useState<string>('');

  const files = useMemo(
    () => fs.readdirSync(path).map((file: File) => {
      const properties = fs.statSync(pathModule.join(path, file));

      return {
        name: file,
        isDirectory: properties.isDirectory(),
      };
    }),
    [path],
  );

  const onGoBack = () => useCallback(() => {
    startTransition(() => {
      setBackHistory(path);
    });

    setPath(pathModule.dirname(path));
  }, []);

  const onFolderOpen = (folder: string) => useCallback(() => {
    setPath(pathModule.join(path, folder));
  }, []);

  const onGoForward = () => useCallback(() => {
    setPath(backHistory);
  }, []);

  return (
    <div className={styles.app}>
      <header>
        <span>Go back...</span>
      </header>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <SidebarMenu />
        </aside>
        <main className={styles.main}>
          <FilesList files={files} />
        </main>
      </div>
    </div>
  );
};

export default App;
