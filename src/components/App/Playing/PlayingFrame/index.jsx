import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './index.css';

const PlayingFrame = ({ children }) => (
  <div id={styles.root}>
    {children}
  </div>
);
PlayingFrame.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PlayingFrame;
