import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { FIREBASE_CONFIG, FIREBASE_EMAIL } from '../../strings';
import { ServerException } from '../../util/exceptions';
import Login from './Login';

// eslint-disable-next-line
class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  componentDidMount() {
    firebase.initializeApp(FIREBASE_CONFIG);
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        window.console.log('logged in');
      }
    });
    firebase.auth().signOut();
  }
  handleLogin(password) {
    return firebase.auth().signInWithEmailAndPassword(
      FIREBASE_EMAIL,
      password,
    ).catch(() => {
      // TODO: HANDLE DIFFERENT ERRORS
      // throw new ServerException('401');
      throw new ServerException('500');
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
