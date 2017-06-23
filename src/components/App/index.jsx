import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ServerException } from '../../util/exceptions';
import Login from './Login';

// eslint-disable-next-line
class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(password) {
    window.console.log(password);
    return Promise.resolve().then(() => {
      throw new ServerException('401');
    });
  }
  render() {
    return <Login onLogin={this.handleLogin} />;
  }
}
export default connect(
  null,
  null,
)(App);
