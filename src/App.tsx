import React, {
  useState, useMemo, startTransition,
} from 'react';

import TitleBar from '@/components/TitleBar';
import SidebarMenu from '@/components/SidebarMenu';
import FilesList from '@/components/FilesList';
import type { File } from '@/typings/file';

import styles from './App.module.scss';

const fs = window.require('fs');
const pathModule = window.require('path');
const { app } = window.require('@electron/remote');
const { shell } = require('electron');

const App: React.FC = () => {
  const [path, setPath] = useState<string>(app.getPath('documents'));
  const [backHistory, setBackHistory] = useState<string[]>([]);
  const [forwardHistory, setForwardHistory] = useState<string[]>([]);

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

  const onGoBack = () => {
    const lastBackHistoryItem = backHistory.pop();

    if (lastBackHistoryItem) {
      startTransition(() => {
        setForwardHistory([...forwardHistory, path]);
        setBackHistory(backHistory);
      });

      setPath(lastBackHistoryItem);
    }
  };

  const onGoForward = () => {
    const lastForwardHistoryItem = forwardHistory.pop();

    if (lastForwardHistoryItem) {
      startTransition(() => {
        setBackHistory([...backHistory, path]);
        setForwardHistory(forwardHistory);
      });

      setPath(lastForwardHistoryItem);
    }
  };

  const onFolderOpen = (folder: string) => {
    startTransition(() => {
      setBackHistory([...backHistory, path]);
      setForwardHistory([]);
    });

    setPath(pathModule.join(path, folder));
  };

  const onFileOpen = (fileName: string) => {
    shell.openPath(pathModule.join(path, fileName));
  };

  const onPathOpen = (folderPath: string) => {
    if (folderPath !== path) {
      startTransition(() => {
        setBackHistory([...backHistory, path]);
        setForwardHistory([]);
      });

      setPath(folderPath);
    }
  };

  return (
    <div className={styles.app}>
      <TitleBar
        onGoBack={onGoBack}
        onGoForward={onGoForward}
        isBackHistoryEmpty={!backHistory.length}
        isForwardHistoryEmpty={!forwardHistory.length}
      />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <SidebarMenu onPathOpen={onPathOpen} />
        </aside>
        <main className={styles.main}>
          <FilesList
            files={files}
            onFolderOpen={onFolderOpen}
            onFileOpen={onFileOpen}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
