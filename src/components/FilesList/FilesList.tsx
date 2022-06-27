import React, {
  useState, useLayoutEffect, useRef,
} from 'react';
import classNames from 'classnames';

import type { File } from '@/typings/file';
import { ReactComponent as FolderIcon } from '@/assets/icons/folder.svg';
import { ReactComponent as FileIcon } from '@/assets/icons/file.svg';

import styles from './FilesList.module.scss';

interface FilesListProps {
  files: File[];
  onFolderOpen: (folder: string) => void;
  onFileOpen: (fileName: string) => void;
}

const FilesList: React.FC<FilesListProps> = ({
  files, onFolderOpen, onFileOpen,
}) => {
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const ref: React.Ref<HTMLDivElement> = useRef(null);

  const onOutsideClick = (event: MouseEvent) => {
    if (ref.current?.contains(event.target as Node)) {
      setSelectedFileName('');
    }
  };

  useLayoutEffect(() => {
    document.addEventListener('click', onOutsideClick, true);

    return () => {
      document.removeEventListener('click', onOutsideClick, true);
    };
  }, []);

  const onItemButtonClick = (event: React.MouseEvent<HTMLElement>, file: File) => {
    setSelectedFileName(file.name);

    if (event.detail === 2) {
      if (file.isDirectory) {
        onFolderOpen(file.name);
      } else {
        onFileOpen(file.name);
      }
    }
  };

  return (
    <div
      className={styles.list}
      ref={ref}
    >
      {files.map((file) => (
        <div
          key={file.name}
          className={styles.tile}
        >
          <button
            onClick={(event: React.MouseEvent<HTMLElement>) => onItemButtonClick(event, file)}
            className={classNames(styles.tileButton, { [`${styles.selectedTileButton}`]: selectedFileName === file.name })}
            title={file.name}
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
            <span className={styles.fileName}>{file.name}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilesList;
