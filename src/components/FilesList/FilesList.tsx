import React from 'react';

import type { File } from '../../typings/file';

interface FilesListProps {
  files: File[];
}

const FilesList: React.FC<FilesListProps> = ({
  files,
}) => (
  <div>
    {files.map((file) => (
      <div key={file.name}>
        <span>{file.name}</span>
      </div>
    ))}
  </div>
);

export default FilesList;
