import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './index.css';

const Waiting = ({ message }) => (
  <div id={styles.root}>
    <div><span id={styles.rootSpinner} className="glyphicon glyphicon-hourglass" aria-hidden="true" /></div>
    <div id={styles.rootMessage}>{message}</div>
  </div>
);
Waiting.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Waiting;
