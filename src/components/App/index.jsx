import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { FIREBASE_CONFIG, FIREBASE_EMAIL, FIREBASE_PASSWORD } from '../../strings';
import * as fromAppBlocking from '../../ducks/appBlocking';
import * as fromConnected from '../../ducks/connected';
import * as fromPresenceKey from '../../ducks/presenceKey';

class App extends Component {
  componentDidMount() {
    const { setAppBlocking, setConnected, setPresenceKey } = this.props;
    firebase.initializeApp(FIREBASE_CONFIG);
    firebase.auth().signOut()
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user !== null) {
            const presenceRef = firebase.database().ref('presence');
            const connectedRef = firebase.database().ref('.info/connected');
            connectedRef.on('value', (snap) => {
              if (snap.val() === true) {
                const myPresenceRef = presenceRef.push(true);
                myPresenceRef.then(({ key }) => {
                  setPresenceKey(key);
                  setAppBlocking(false);
                });
                myPresenceRef.onDisconnect().remove();
                setConnected(true);
              } else {
                setConnected(false);
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
  setAppBlocking: PropTypes.func.isRequired,
  setConnected: PropTypes.func.isRequired,
  setPresenceKey: PropTypes.func.isRequired,
};
export default connect(
  state => ({
    appBlocking: fromAppBlocking.getAppBlocking(state),
  }), {
    setAppBlocking: fromAppBlocking.setAppBlocking,
    setConnected: fromConnected.setConnected,
    setPresenceKey: fromPresenceKey.setPresenceKey,
  },
)(App);
