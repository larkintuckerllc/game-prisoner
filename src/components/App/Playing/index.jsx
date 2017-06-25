import React from 'react';
import { PropTypes } from 'prop-types';
import { PAIRED, SELECTING } from '../../../ducks/gameState';
import PlayingFrame from './PlayingFrame';
import styles from './index.css';

const Playing = ({ gameState, onSelect }) => (
  <PlayingFrame>
    <div id={styles.rootCards}>
      { gameState === PAIRED && <div className={styles.Cover}>discuss with your partner</div> }
      <div className={styles.rootCardsFrame}>
        <div
          className={styles.rootCardsFrameCard}
          onClick={() => onSelect(true)}
          role="button"
          tabIndex={0}
        >
          <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true" />
        </div>
      </div>
      <div className={styles.rootCardsFrame}>
        <div
          className={styles.rootCardsFrameCard}
          onClick={() => onSelect(false)}
          role="button"
          tabIndex={0}
        >
          <span className="glyphicon glyphicon-thumbs-down" aria-hidden="true" />
        </div>
      </div>
    </div>
    <div id={styles.rootChat}>
      { gameState === SELECTING && <div className={styles.Cover}>make selection</div> }
      Chat
    </div>
  </PlayingFrame>
);
Playing.propTypes = {
  gameState: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default Playing;
