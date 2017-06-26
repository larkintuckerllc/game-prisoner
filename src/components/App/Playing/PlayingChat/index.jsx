import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './index.css';

const PlayingChat = ({ cover }) => (
  <div id={styles.root}>
    { cover && <div className={styles.rootCover}>make selection</div>}
    <div id={styles.rootLog}>
      <div className={`${styles.rootLogItem} ${styles.rootLogOther}`}>LOG</div>
      <div className={`${styles.rootLogItem} ${styles.rootLogSelf}`}>LOG</div>
      <div className={`${styles.rootLogItem} ${styles.rootLogOther}`}>LOG</div>
      <div className={`${styles.rootLogItem} ${styles.rootLogOther}`}>LOG</div>
    </div>
    <div id={styles.rootInput}>
      <input type="text" className="form-control" id="usr" />
    </div>
  </div>
);
PlayingChat.propTypes = {
  cover: PropTypes.bool.isRequired,
};
export default PlayingChat;
