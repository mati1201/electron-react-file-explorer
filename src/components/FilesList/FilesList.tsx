import React from 'react';

import type { File } from '../../typings/file';

interface FilesListProps {
  files: File[];
  onFolderOpen: (folder: string) => void;
}

const FilesList: React.FC<FilesListProps> = ({
  files,
  onFolderOpen,
}) => {
  const onFileButtonClick = (event: React.MouseEvent<HTMLElement>, file: File) => {
    if (event.detail === 1) {
      // mark selected
    }

    if (event.detail === 2) {
      if (file.isDirectory) {
        onFolderOpen(file.name);
      } else {
        // open file with default app
      }
    }
  };

  return (
    <div>
      {files.map((file) => (
        <div key={file.name}>
          {file.isDirectory && (
            <span>dir:</span>
          )}
          <button
            onClick={(event: React.MouseEvent<HTMLElement>) => onFileButtonClick(event, file)}
            value={file.name}
          >
            <span>{file.name}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilesList;
