import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import { PAIRED, SELECTING } from '../../../ducks/gameState';
import * as fromMessages from '../../../ducks/messages';
import PlayingCards from './PlayingCards';
import PlayingChat from './PlayingChat';
import PlayingFrame from './PlayingFrame';

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
    const { addMessage, gameState, messages, onSelect } = this.props;
    return (
      <PlayingFrame>
        <PlayingCards
          cover={gameState === PAIRED}
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
  addMessage: PropTypes.func.isRequired,
  gameState: PropTypes.string.isRequired,
  // eslint-disable-next-line
  messages: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  presenceKey: PropTypes.string.isRequired,
};
export default connect(state => ({
  messages: fromMessages.getMessages(state),
}), {
  addMessage: fromMessages.addMessage,
})(Playing);
