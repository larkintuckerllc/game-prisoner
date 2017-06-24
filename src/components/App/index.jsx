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
import * as fromJoined from '../../ducks/joined';
import * as fromPresenceKey from '../../ducks/presenceKey';
import Connecting from './Connecting';
import Join from './Join';
import Login from './Login';
import Playing from './Playing';
import Waiting from './Waiting';

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
class App extends Component {
  constructor(props) {
    super(props);
    this.handleJoin = this.handleJoin.bind(this);
  }
  componentDidMount() {
    const {
      resetPresenceKey,
      setAuthenticated,
      setConnected,
      setJoined,
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
            setJoined(false);
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
  handleJoin() {
    const { presenceKey, setJoined } = this.props;
    setJoined(true);
    firebase.database().ref('joined').push(presenceKey);
    return Promise.resolve();
  }
  handleSelect(cooperate) {
    window.console.log(cooperate);
  }
  render() {
    const {
      authenticated,
      connected,
      joined,
      gameState,
    } = this.props;
    return (
      <Playing
        gameState={fromGameState.SELECTING}
        onSelect={this.handleSelect}
      />
    );
    /*
    if (!authenticated) return <Login onLogin={handleLogin} />;
    if (!connected) return <Connecting />;
    switch (gameState) {
      case fromGameState.JOIN:
        if (!joined) return <Join onJoin={this.handleJoin} />;
        return <Waiting message="waiting for game to start" />;
      case fromGameState.PAIRED:
        if (!joined) return <Waiting message="waiting for next game" />;
        return <div>PAIRED</div>;
      default:
        return <div>DEFAULT</div>;
    }
    */
  }
}
App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  connected: PropTypes.bool.isRequired,
  joined: PropTypes.bool.isRequired,
  gameState: PropTypes.string,
  presenceKey: PropTypes.string,
  resetPresenceKey: PropTypes.func.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
  setConnected: PropTypes.func.isRequired,
  setGameState: PropTypes.func.isRequired,
  setJoined: PropTypes.func.isRequired,
  setPresenceKey: PropTypes.func.isRequired,
};
App.defaultProps = {
  gameState: null,
  presenceKey: null,
};
export default connect(
  state => ({
    authenticated: fromAuthenticated.getAuthenticated(state),
    connected: fromConnected.getConnected(state),
    joined: fromJoined.getJoined(state),
    gameState: fromGameState.getGameState(state),
    presenceKey: fromPresenceKey.getPresenceKey(state),
  }),
  {
    resetPresenceKey: fromPresenceKey.resetPresenceKey,
    setAuthenticated: fromAuthenticated.setAuthenticated,
    setConnected: fromConnected.setConnected,
    setGameState: fromGameState.setGameState,
    setJoined: fromJoined.setJoined,
    setPresenceKey: fromPresenceKey.setPresenceKey,
  },
)(App);
