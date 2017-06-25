import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './index.css';

const PlayingCards = ({ cover, onSelect }) => (
  <div id={styles.root}>
    { cover && <div className={styles.rootCover}>discuss with your partner</div>}
    <div className={styles.rootFrame}>
      <div
        className={styles.rootFrameCard}
        onClick={() => onSelect(true)}
        role="button"
        tabIndex={0}
      >
        <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true" />
      </div>
    </div>
    <div className={styles.rootFrame}>
      <div
        className={styles.rootFrameCard}
        onClick={() => onSelect(false)}
        role="button"
        tabIndex={0}
      >
        <span className="glyphicon glyphicon-thumbs-down" aria-hidden="true" />
      </div>
    </div>
  </div>
);
PlayingCards.propTypes = {
  cover: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default PlayingCards;
