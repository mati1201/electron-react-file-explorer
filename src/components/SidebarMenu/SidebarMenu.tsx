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

const SidebarMenu: React.FC = () => (
  <div className={styles.wrapper}>
    {sidebarStaticFoldersList.map((element) => (
      <span key={element.path}>{element.name}</span>
    ))}
  </div>
);

export default SidebarMenu;
