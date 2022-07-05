import React from 'react';
import classNames from 'classnames';

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
  currentPath: string;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  onPathOpen, currentPath,
}) => (
  <div className={styles.wrapper}>
    {sidebarStaticFoldersList.map((menuItem) => (
      <button
        onClick={() => onPathOpen(menuItem.path)}
        key={menuItem.path}
        className={classNames(styles.menuItem, { [`${styles.activeMenuItem}`]: menuItem.path === currentPath })}
      >
        <span>{menuItem.name}</span>
      </button>
    ))}
  </div>
);

export default SidebarMenu;
