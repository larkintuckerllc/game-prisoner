import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { FIREBASE_CONFIG, FIREBASE_EMAIL, FIREBASE_PASSWORD } from '../../strings';
import * as fromAppBlocking from '../../ducks/appBlocking';

class App extends Component {
  componentDidMount() {
    firebase.initializeApp(FIREBASE_CONFIG);
    firebase.auth().signOut()
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          window.console.log(user);
          if (user !== null) {
            const presenceRef = firebase.database().ref('presence');
            const connectedRef = firebase.database().ref('.info/connected');
            connectedRef.on('value', (snap) => {
              if (snap.val() === true) {
                presenceRef.push(screen.id);
                presenceRef.onDisconnect().remove();
                window.console.log('connected');
              } else {
                window.console.log('disconnected');
              }
            });
          }
        });
        firebase.auth().signInWithEmailAndPassword(
          FIREBASE_EMAIL,
          FIREBASE_PASSWORD,
        );
      });
  }
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
