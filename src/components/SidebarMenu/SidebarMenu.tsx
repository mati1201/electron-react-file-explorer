import React from 'react';

import styles from './SidebarMenu.module.scss';

const { app } = window.require('@electron/remote');

const sidebarStaticFoldersList = [
  {
    name: 'Desktop',
    path: app.getPath('desktop'),
  },
  {
    name: 'Documents',
    path: app.getPath('documents'),
  },
  {
    name: 'Downloads',
    path: app.getPath('downloads'),
  },
];

interface SidebarMenuProps {
  onPathOpen: (folderPath: string) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  onPathOpen,
}) => (
  <div className={styles.wrapper}>
    {sidebarStaticFoldersList.map((menuItem) => (
      <button
        onClick={() => onPathOpen(menuItem.path)}
        key={menuItem.path}
        className={styles.menuItem}
      >
        <span>{menuItem.name}</span>
      </button>
    ))}
  </div>
);

export default SidebarMenu;
