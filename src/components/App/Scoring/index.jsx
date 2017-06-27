import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

const Scoring = ({ amount, otherAmount, score }) => (
  <div id={styles.root}>
    <div id={styles.rootRules}>
      <table>
        <tbody>
          <tr>
            <td />
            <td className={`${styles.title} ${styles.center}`}>you</td>
            <td className={`${styles.title} ${styles.center}`}>them</td>
          </tr>
          <tr>
            <td className={styles.title}>cooperate</td>
            <td className={styles.center}>0</td>
            <td className={styles.center}>{otherAmount.toString()}</td>
          </tr>
          <tr>
            <td className={styles.title}>not</td>
            <td className={styles.center}>{amount.toString()}</td>
            <td className={styles.center}>0</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id={styles.rootScore}><span className={styles.title}>Score: </span>{score.toString()}</div>
  </div>
);
Scoring.propTypes = {
  amount: PropTypes.number.isRequired,
  otherAmount: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
export default Scoring;
