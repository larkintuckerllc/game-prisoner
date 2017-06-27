import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './index.css';

const Score = ({ self, other }) => {
  if (other === null) return <div id={styles.root} />;
  return (
    <div id={styles.root}>
      <div id={styles.rootResults}>
        <div>
          <div>you</div>
          <div className={styles.rootResultsResultIcon}>
            <span
              className={`glyphicon ${self ? 'glyphicon-thumbs-up' : 'glyphicon-thumbs-down'}`}
              aria-hidden="true"
            />
          </div>
        </div>
        <div>
          <div>them</div>
          <div className={styles.rootResultsResultIcon}>
            <span
              className={`glyphicon ${other ? 'glyphicon-thumbs-up' : 'glyphicon-thumbs-down'}`}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <div id={styles.rootMessage}>waiting for next round</div>
    </div>
  );
};
Score.propTypes = {
  self: PropTypes.bool.isRequired,
  other: PropTypes.bool,
};
Score.defaultProps = {
  other: null,
};
export default Score;
