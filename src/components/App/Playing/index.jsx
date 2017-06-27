import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import { DISCUSSING, SELECTING } from '../../../ducks/gameState';
import * as fromMessages from '../../../ducks/messages';
import PlayingCards from './PlayingCards';
import PlayingChat from './PlayingChat';
import PlayingFrame from './PlayingFrame';
import Scoring from '../Scoring';

class Playing extends Component {
  constructor(props) {
    super(props);
    this.handleChildAdded = this.handleChildAdded.bind(this);
  }
  componentDidMount() {
    const { presenceKey } = this.props;
    firebase.database().ref(`messages/${presenceKey}`).on('child_added', this.handleChildAdded);
  }
  componentWillUnmount() {
    const { presenceKey } = this.props;
    firebase.database().ref(`messages/${presenceKey}`).off('child_added', this.handleChildAdded);
  }
  handleChildAdded(snap) {
    const { addMessage } = this.props;
    addMessage({
      self: false,
      body: snap.val(),
    });
  }
  render() {
    const { addMessage, amount, gameState, messages, onSelect, otherAmount, score } = this.props;
    return (
      <PlayingFrame>
        <Scoring
          amount={amount}
          otherAmount={otherAmount}
          score={score}
        />
        <PlayingCards
          cover={gameState === DISCUSSING}
          onSelect={onSelect}
        />
        <PlayingChat
          addMessage={addMessage}
          cover={gameState === SELECTING}
          messages={messages}
        />
      </PlayingFrame>
    );
  }
}
Playing.propTypes = {
  amount: PropTypes.number.isRequired,
  addMessage: PropTypes.func.isRequired,
  gameState: PropTypes.string.isRequired,
  // eslint-disable-next-line
  messages: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  otherAmount: PropTypes.number.isRequired,
  presenceKey: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
export default connect(state => ({
  messages: fromMessages.getMessages(state),
}), {
  addMessage: fromMessages.addMessage,
})(Playing);
