import React from 'react';
import styles from './index.css';

const Connecting = () => (
  <div id={styles.root}>
    <span id={styles.rootSpinner} className="glyphicon glyphicon-cog" aria-hidden="true" />
  </div>
);
export default Connecting;
