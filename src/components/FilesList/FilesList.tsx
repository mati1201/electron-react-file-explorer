import React from 'react';

import type { File } from '../../typings/file';
import { ReactComponent as FolderIcon } from '../../assets/icons/folder.svg';
import { ReactComponent as FileIcon } from '../../assets/icons/file.svg';

import styles from './FilesList.module.scss';

interface FilesListProps {
  files: File[];
  onFolderOpen: (folder: string) => void;
  onFileOpen: (fileName: string) => void;
}

const FilesList: React.FC<FilesListProps> = ({
  files, onFolderOpen, onFileOpen,
}) => {
  const onItemButtonClick = (event: React.MouseEvent<HTMLElement>, file: File) => {
    if (event.detail === 1) {
      // mark selected
    }

    if (event.detail === 2) {
      if (file.isDirectory) {
        onFolderOpen(file.name);
      } else {
        onFileOpen(file.name);
      }
    }
  };

  return (
    <div className={styles.list}>
      {files.map((file) => (
        <div
          key={file.name}
          className={styles.tile}
        >
          <button
            onClick={(event: React.MouseEvent<HTMLElement>) => onItemButtonClick(event, file)}
            className={styles.tileButton}
          >
            {file.isDirectory ? (
              <FolderIcon
                width={45}
                height={45}
              />
            ) : (
              <FileIcon
                width={40}
                height={45}
              />
            )}
            <span
              className={styles.fileName}
              title={file.name}
            >
              {file.name}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilesList;
