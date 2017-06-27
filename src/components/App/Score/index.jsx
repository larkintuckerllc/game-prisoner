import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ScoreView from './ScoreView';

class Score extends Component {
  componentDidMount() {
    const { setOtherSelection } = this.props;
    setOtherSelection('true');
  }
  render() {
    const { self, other } = this.props;
    return (
      <ScoreView
        self={self}
        other={other}
      />
    );
  }
}
Score.propTypes = {
  other: PropTypes.bool,
  self: PropTypes.bool.isRequired,
  setOtherSelection: PropTypes.func.isRequired,
};
Score.defaultProps = {
  other: null,
};
export default Score;
