import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './index.css';

const Score = ({ selection, otherSelection }) => (
  <div id={styles.root}>
    <div id={styles.rootResults}>
      <div>
        <div>you</div>
        <div className={styles.rootResultsResultIcon}>
          <span
            className={`glyphicon ${selection ? 'glyphicon-thumbs-up' : 'glyphicon-thumbs-down'}`}
            aria-hidden="true"
          />
        </div>
      </div>
      <div>
        <div>them</div>
        <div className={styles.rootResultsResultIcon}>
          <span
            className={`glyphicon ${otherSelection ? 'glyphicon-thumbs-up' : 'glyphicon-thumbs-down'}`}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
    <div id={styles.rootMessage}>waiting for next round</div>
  </div>
);
Score.propTypes = {
  selection: PropTypes.bool.isRequired,
  otherSelection: PropTypes.bool.isRequired,
};
export default Score;
