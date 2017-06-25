import React from 'react';
import { PropTypes } from 'prop-types';
import { PAIRED, SELECTING } from '../../../ducks/gameState';
import PlayingCards from './PlayingCards';
import PlayingChat from './PlayingChat';
import PlayingFrame from './PlayingFrame';

const Playing = ({ gameState, onSelect }) => (
  <PlayingFrame>
    <PlayingCards cover={gameState === PAIRED} onSelect={onSelect} />
    <PlayingChat cover={gameState === SELECTING} />
  </PlayingFrame>
);
Playing.propTypes = {
  gameState: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default Playing;
