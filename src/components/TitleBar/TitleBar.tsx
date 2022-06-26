import React from 'react';

import styles from './TitleBar.module.scss';

interface TitleBarProps {
  onGoBack: () => void;
  onGoForward: () => void;
  isBackHistoryEmpty: boolean;
  isForwardHistoryEmpty: boolean;
}

const TitleBar: React.FC<TitleBarProps> = ({
  onGoBack,
  onGoForward,
  isBackHistoryEmpty,
  isForwardHistoryEmpty,
}) => (
  <header className={styles.header}>
    custom title bar
    <button
      onClick={onGoBack}
      disabled={isBackHistoryEmpty}
    >
      <span>Go back...</span>
    </button>
    <button
      onClick={onGoForward}
      disabled={isForwardHistoryEmpty}
    >
      <span>Go Forward...</span>
    </button>
  </header>
);

export default TitleBar;
