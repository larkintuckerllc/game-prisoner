import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

const Alert = ({ message }) => (
  <div id={styles.root}>
    <span id={styles.rootSpinner} className="glyphicon glyphicon-alert" aria-hidden="true" />
    <div id={styles.rootMessage}>{message}</div>
  </div>
);
Alert.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Alert;
