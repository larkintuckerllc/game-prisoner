import React from 'react';
import { PropTypes } from 'prop-types';
import Scoring from '../Scoring';
import styles from './index.css';

const Score = ({ selection, otherSelection }) => (
  <div id={styles.root}>
    <Scoring />
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
            <tr>
              <td className={styles.title}>you</td>
              <td>0</td>
            </tr>
            <tr>
              <td className={styles.title}>them</td>
              <td>0</td>
            </tr>
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
            <tr>
              <td className={styles.title}>you</td>
              <td>0</td>
            </tr>
            <tr>
              <td className={styles.title}>them</td>
              <td>0</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
);
Score.propTypes = {
  selection: PropTypes.bool.isRequired,
  otherSelection: PropTypes.bool.isRequired,
};
export default Score;
