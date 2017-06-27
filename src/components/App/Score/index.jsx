import React from 'react';
import { PropTypes } from 'prop-types';
import Scoring from '../Scoring';
import styles from './index.css';

const Score = ({ amount, selection, otherAmount, otherSelection, score }) => (
  <div id={styles.root}>
    <Scoring
      amount={amount}
      otherAmount={otherAmount}
      score={score}
    />
    <div id={styles.rootResults}>
      <div className={styles.rootResultsResult}>
        <div className={styles.rootResultsResultTitle}>you</div>
        <div className={styles.rootResultsResultIcon}>
          <span
            className={`glyphicon ${selection ? 'glyphicon-thumbs-up' : 'glyphicon-thumbs-down'}`}
            aria-hidden="true"
          />
        </div>
        <div className={styles.rootResultsResultScore}>
          <table>
            <tbody>
              <tr>
                <td className={styles.title}>you</td>
                <td>{(selection ? 0 : amount).toString()}</td>
              </tr>
              <tr>
                <td className={styles.title}>them</td>
                <td>{(selection ? otherAmount : 0).toString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className={styles.rootResultsResultTitle}>them</div>
        <div className={styles.rootResultsResultIcon}>
          <span
            className={`glyphicon ${otherSelection ? 'glyphicon-thumbs-up' : 'glyphicon-thumbs-down'}`}
            aria-hidden="true"
          />
        </div>
        <div className={styles.rootResultsResultScore}>
          <table>
            <tbody>
              <tr>
                <td className={styles.title}>you</td>
                <td>{(otherSelection ? otherAmount : 0).toString()}</td>
              </tr>
              <tr>
                <td className={styles.title}>them</td>
                <td>{(otherSelection ? 0 : amount).toString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
Score.propTypes = {
  amount: PropTypes.number.isRequired,
  selection: PropTypes.bool.isRequired,
  otherAmount: PropTypes.number.isRequired,
  otherSelection: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
};
export default Score;
