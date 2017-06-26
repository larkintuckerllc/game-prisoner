import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import { PAIRED, SELECTING } from '../../../ducks/gameState';
import * as fromMessages from '../../../ducks/messages';
import * as fromPaired from '../../../ducks/paired';
import PlayingCards from './PlayingCards';
import PlayingChat from './PlayingChat';
import PlayingFrame from './PlayingFrame';

class Playing extends Component {
  constructor(props) {
    super(props);
    this.handleChildAdded = this.handleChildAdded.bind(this);
  }
  componentDidMount() {
    const { presenceKey, setPaired } = this.props;
    firebase.database().ref(`paired/${presenceKey}`).once('value', snap => setPaired(snap.val()));
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
    const { addMessage, gameState, messages, onSelect, paired } = this.props;
    return (
      <PlayingFrame>
        <PlayingCards cover={gameState === PAIRED} onSelect={onSelect} />
        <PlayingChat
          addMessage={addMessage}
          cover={
            gameState === SELECTING ||
            paired === null
          }
          messages={messages}
        />
      </PlayingFrame>
    );
  }
}
Playing.propTypes = {
  addMessage: PropTypes.func.isRequired,
  gameState: PropTypes.string.isRequired,
  // eslint-disable-next-line
  messages: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  paired: PropTypes.string,
  presenceKey: PropTypes.string.isRequired,
  setPaired: PropTypes.func.isRequired,
};
Playing.defaultProps = {
  paired: null,
};
export default connect(state => ({
  messages: fromMessages.getMessages(state),
  paired: fromPaired.getPaired(state),
}), {
  addMessage: fromMessages.addMessage,
  setPaired: fromPaired.setPaired,
})(Playing);
