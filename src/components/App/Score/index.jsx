import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import firebase from 'firebase/app';
import ScoreView from './ScoreView';

class Score extends Component {
  componentDidMount() {
    const { paired, setOtherSelection } = this.props;
    firebase.database().ref(`selection/${paired}`).once('value', snap => setOtherSelection(snap.val()));
  }
  render() {
    const { selection, otherSelection } = this.props;
    return (
      <ScoreView
        selection={selection}
        otherSelection={otherSelection}
      />
    );
  }
}
Score.propTypes = {
  otherSelection: PropTypes.bool,
  paired: PropTypes.string.isRequired,
  selection: PropTypes.bool.isRequired,
  setOtherSelection: PropTypes.func.isRequired,
};
Score.defaultProps = {
  otherSelection: null,
};
export default Score;
