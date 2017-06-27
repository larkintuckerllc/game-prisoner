import React from 'react';
import styles from './index.css';

const Scoring = () => (
  <div id={styles.root}>
    <div id={styles.rootRules}>
      <table>
        <tr>
          <td />
          <td className={`${styles.title} ${styles.center}`}>you</td>
          <td className={`${styles.title} ${styles.center}`}>them</td>
        </tr>
        <tr>
          <td className={styles.title}>cooperate</td>
          <td className={styles.center}>0</td>
          <td className={styles.center}>3</td>
        </tr>
        <tr>
          <td className={styles.title}>not</td>
          <td className={styles.center}>2</td>
          <td className={styles.center}>0</td>
        </tr>
      </table>
    </div>
    <div id={styles.rootScore}><span className={styles.title}>Score:</span> 0</div>
  </div>
);
export default Scoring;
