import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './index.css';

const PlayingChat = ({ cover }) => (
  <div id={styles.root}>
    { cover && <div className={styles.rootCover}>make selection</div>}
  </div>
);
PlayingChat.propTypes = {
  cover: PropTypes.bool.isRequired,
};
export default PlayingChat;
