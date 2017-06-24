import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { FIREBASE_CONFIG, FIREBASE_EMAIL } from '../../strings';
import { ServerException } from '../../util/exceptions';
import * as fromAuthenticated from '../../ducks/authenticated';
import * as fromConnected from '../../ducks/connected';
import * as fromGameState from '../../ducks/gameState';
import * as fromPresenceKey from '../../ducks/presenceKey';
import Connecting from './Connecting';
import Join from './Join';
import Login from './Login';

const handleLogin = password => (
  firebase.auth().signInWithEmailAndPassword(
    FIREBASE_EMAIL,
    password,
  ).catch((error) => {
    if (error.code === 'auth/wrong-password') {
      throw new ServerException('401');
    }
    throw new ServerException('500');
  })
);
const handleJoin = () => {
  window.console.log('joined');
  return Promise.resolve();
};
class App extends Component {
  componentDidMount() {
    const {
      resetPresenceKey,
      setAuthenticated,
      setConnected,
      setGameState,
      setPresenceKey,
    } = this.props;
    firebase.initializeApp(FIREBASE_CONFIG);
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        setAuthenticated(true);
        // PRESENCE
        const connectedRef = firebase.database().ref('.info/connected');
        connectedRef.on('value', (snap) => {
          if (snap.val() === true) {
            setConnected(true);
            const presenceRef = firebase.database().ref('presence').push(true);
            presenceRef.then(({ key }) => {
              setPresenceKey(key);
              presenceRef.onDisconnect().remove();
            });
          } else {
            setConnected(false);
            resetPresenceKey();
          }
        });
        // STATE
        firebase.database().ref('gameState').on('value', (snap) => {
          const gameState = snap.val();
          setGameState(gameState);
        });
      }
    });
    firebase.auth().signOut();
  }
  render() {
    const {
      authenticated,
      connected,
      gameState,
    } = this.props;
    if (!authenticated) return <Login onLogin={handleLogin} />;
    if (!connected) return <Connecting />;
    switch (gameState) {
      case 'JOIN':
        return <Join onJoin={handleJoin} />;
      default:
        return <div>DEFAULT</div>;
    }
  }
}
App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  connected: PropTypes.bool.isRequired,
  gameState: PropTypes.string,
  resetPresenceKey: PropTypes.func.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
  setConnected: PropTypes.func.isRequired,
  setGameState: PropTypes.func.isRequired,
  setPresenceKey: PropTypes.func.isRequired,
};
App.defaultProps = {
  gameState: null,
};
export default connect(
  state => ({
    authenticated: fromAuthenticated.getAuthenticated(state),
    connected: fromConnected.getConnected(state),
    gameState: fromGameState.getGameState(state),
  }),
  {
    resetPresenceKey: fromPresenceKey.resetPresenceKey,
    setAuthenticated: fromAuthenticated.setAuthenticated,
    setConnected: fromConnected.setConnected,
    setGameState: fromGameState.setGameState,
    setPresenceKey: fromPresenceKey.setPresenceKey,
  },
)(App);
