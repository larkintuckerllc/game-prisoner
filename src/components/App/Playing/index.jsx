import React from 'react';
import { PropTypes } from 'prop-types';
import { PAIRED, SELECTING } from '../../../ducks/gameState';
import PlayingCards from './PlayingCards';
import PlayingChat from './PlayingChat';
import PlayingFrame from './PlayingFrame';

const Playing = ({ addMessage, gameState, messages, onSelect }) => (
  <PlayingFrame>
    <PlayingCards cover={gameState === PAIRED} onSelect={onSelect} />
    <PlayingChat
      addMessage={addMessage}
      cover={gameState === SELECTING}
      messages={messages}
    />
  </PlayingFrame>
);
Playing.propTypes = {
  addMessage: PropTypes.func.isRequired,
  gameState: PropTypes.string.isRequired,
  // eslint-disable-next-line
  messages: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default Playing;
