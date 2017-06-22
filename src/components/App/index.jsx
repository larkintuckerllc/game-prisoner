import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as fromAppBlocking from '../../ducks/appBlocking';

// eslint-disable-next-line
class App extends Component {
  render() {
    const { appBlocking } = this.props;
    if (appBlocking) return <div>Loading</div>;
    return <div>Loaded</div>;
  }
}
App.propTypes = {
  appBlocking: PropTypes.bool.isRequired,
};
export default connect(
  state => ({
    appBlocking: fromAppBlocking.getAppBlocking(state),
  }), null,
)(App);
