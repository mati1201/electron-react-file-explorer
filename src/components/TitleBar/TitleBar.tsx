import React from 'react';

import styles from './TitleBar.module.scss';
import { ReactComponent as Minimize } from '../../assets/icons/minimize.svg';
import { ReactComponent as Maximize } from '../../assets/icons/maximize.svg';
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as BackArrow } from '../../assets/icons/backArrow.svg';

const { BrowserWindow } = window.require('@electron/remote');

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
    <section className={styles.section}>
      <button
        onClick={onGoBack}
        disabled={isBackHistoryEmpty}
        className={styles.appActionButton}
      >
        <BackArrow
          width={15}
          height={15}
        />
      </button>
      <button
        onClick={onGoForward}
        disabled={isForwardHistoryEmpty}
        className={styles.appActionButton}
      >
        <div className={styles.rotate}>
          <BackArrow
            width={15}
            height={15}
          />
        </div>
      </button>
    </section>
    <section className={styles.section}>
      <button
        onClick={() => BrowserWindow.getFocusedWindow().minimize()}
        className={styles.windowActionButton}
      >
        <Minimize
          width={15}
          height={15}
        />
      </button>
      <button
        onClick={() => BrowserWindow.getFocusedWindow().maximize()}
        className={styles.windowActionButton}
      >
        <Maximize
          width={15}
          height={15}
        />
      </button>
      <button
        onClick={() => BrowserWindow.getFocusedWindow().close()}
        className={styles.windowActionButton}
      >
        <Close
          width={15}
          height={15}
        />
      </button>
    </section>
  </header>
);

export default TitleBar;
