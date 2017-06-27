import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { FIREBASE_CONFIG, FIREBASE_EMAIL, RUNNING } from '../../strings';
import { ServerException } from '../../util/exceptions';
import * as fromAmount from '../../ducks/amount';
import * as fromAuthenticated from '../../ducks/authenticated';
import * as fromConnected from '../../ducks/connected';
import * as fromGameState from '../../ducks/gameState';
import * as fromJoined from '../../ducks/joined';
import * as fromMessages from '../../ducks/messages';
import * as fromOtherAmount from '../../ducks/otherAmount';
import * as fromOtherSelection from '../../ducks/otherSelection';
import * as fromPaired from '../../ducks/paired';
import * as fromPresenceKey from '../../ducks/presenceKey';
import * as fromSelected from '../../ducks/selected';
import * as fromSelection from '../../ducks/selection';
import Connecting from './Connecting';
import Join from './Join';
import Alert from './Alert';
import Login from './Login';
import Playing from './Playing';
import Score from './Score';
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
    this.handleGameState = this.handleGameState.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    const {
      resetPresenceKey,
      setAuthenticated,
      setConnected,
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
            this.resetRound();
            this.resetGame();
            resetPresenceKey();
            setConnected(false);
          }
        });
        // STATE
        firebase.database().ref('gameState').on('value', this.handleGameState);
      }
    });
    firebase.auth().signOut();
  }
  resetGame() {
    const { setJoined } = this.props;
    setJoined(false);
  }
  resetRound() {
    const {
      resetMessages,
      resetOtherSelection,
      resetPaired,
      resetSelection,
      setSelected,
    } = this.props;
    resetOtherSelection();
    setSelected(false);
    resetSelection();
    resetMessages();
    resetPaired();
  }
  handleGameState(gameStateSnap) {
    const {
      joined,
      paired,
      presenceKey,
      setAmount,
      setGameState,
      setOtherAmount,
      setOtherSelection,
      setPaired,
    } = this.props;
    const gameState = gameStateSnap.val();
    const commands = [];
    switch (gameState) {
      case fromGameState.JOIN:
        this.resetGame();
        setGameState(fromGameState.JOIN);
        this.resetRound();
        break;
      case fromGameState.STARTING:
        setGameState(fromGameState.STARTING);
        this.resetRound();
        break;
      case fromGameState.DISCUSSING:
        if (joined) {
          commands.push(firebase.database().ref('amount').once('value', snap => setAmount(snap.val())));
          commands.push(firebase.database().ref('otherAmount').once('value', snap => setOtherAmount(snap.val())));
          commands.push(firebase.database().ref(`paired/${presenceKey}`).once('value', snap => setPaired(snap.val())));
        }
        break;
      case fromGameState.SCORE:
        if (joined) commands.push(firebase.database().ref(`selection/${paired}`).once('value', snap => setOtherSelection(snap.val())));
        break;
      default:
    }
    Promise.all(commands).then(() => setGameState(gameState));
  }
  handleJoin() {
    const { presenceKey, setJoined } = this.props;
    setJoined(true);
    const joinedKeyRef = firebase.database().ref(`joined/${presenceKey}`);
    joinedKeyRef.set(true);
    joinedKeyRef.onDisconnect().remove();
    return Promise.resolve();
  }
  handleSelect(selection) {
    const { setSelected, setSelection } = this.props;
    setSelection(selection);
    setSelected(true);
  }
  render() {
    const { presenceKey } = this.props;
    return (
      <Playing
        gameState={fromGameState.DISCUSSING}
        onSelect={() => {}}
        presenceKey={presenceKey}
      />
    );
    /*
    const {
      authenticated,
      connected,
      joined,
      gameState,
      otherSelection,
      presenceKey,
      selected,
      selection,
    } = this.props;
    if (RUNNING) return <Alert message="running in another window" />;
    if (!authenticated) return <Login onLogin={handleLogin} />;
    if (!connected) return <Connecting />;
    switch (gameState) {
      case fromGameState.JOIN:
        if (!joined) return <Join onJoin={this.handleJoin} />;
        return <Waiting message="waiting for game to start" />;
      case fromGameState.STARTING:
        if (!joined) return <Waiting message="waiting for next game" />;
        return <Connecting />;
      case fromGameState.DISCUSSING:
        if (!joined) return <Waiting message="waiting for next game" />;
        return (
          <Playing
            gameState={fromGameState.DISCUSSING}
            onSelect={() => {}}
            presenceKey={presenceKey}
          />
        );
      case fromGameState.SELECTING:
        if (!joined) return <Waiting message="waiting for next game" />;
        if (selected) return <Waiting message="waiting for round to end" />;
        return (
          <Playing
            gameState={fromGameState.SELECTING}
            onSelect={this.handleSelect}
            presenceKey={presenceKey}
          />
        );
      case fromGameState.SCORE:
        if (!joined) return <Waiting message="waiting for next game" />;
        return (
          <Score
            selection={selection}
            otherSelection={otherSelection}
          />
        );
      default:
        return <Connecting />;
    }
    */
  }
}
App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  connected: PropTypes.bool.isRequired,
  joined: PropTypes.bool.isRequired,
  gameState: PropTypes.string,
  otherSelection: PropTypes.bool,
  paired: PropTypes.string,
  presenceKey: PropTypes.string,
  resetMessages: PropTypes.func.isRequired,
  resetOtherSelection: PropTypes.func.isRequired,
  resetPaired: PropTypes.func.isRequired,
  resetPresenceKey: PropTypes.func.isRequired,
  resetSelection: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  selection: PropTypes.bool,
  setAmount: PropTypes.func.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
  setConnected: PropTypes.func.isRequired,
  setGameState: PropTypes.func.isRequired,
  setJoined: PropTypes.func.isRequired,
  setOtherAmount: PropTypes.func.isRequired,
  setOtherSelection: PropTypes.func.isRequired,
  setPaired: PropTypes.func.isRequired,
  setPresenceKey: PropTypes.func.isRequired,
  setSelected: PropTypes.func.isRequired,
  setSelection: PropTypes.func.isRequired,
};
App.defaultProps = {
  gameState: null,
  otherSelection: null,
  paired: null,
  presenceKey: null,
  selection: null,
};
export default connect(
  state => ({
    authenticated: fromAuthenticated.getAuthenticated(state),
    connected: fromConnected.getConnected(state),
    joined: fromJoined.getJoined(state),
    gameState: fromGameState.getGameState(state),
    otherSelection: fromOtherSelection.getOtherSelection(state),
    paired: fromPaired.getPaired(state),
    presenceKey: fromPresenceKey.getPresenceKey(state),
    selected: fromSelected.getSelected(state),
    selection: fromSelection.getSelection(state),
  }),
  {
    resetMessages: fromMessages.resetMessages,
    resetOtherSelection: fromOtherSelection.resetOtherSelection,
    resetPaired: fromPaired.resetPaired,
    resetPresenceKey: fromPresenceKey.resetPresenceKey,
    resetSelection: fromSelection.resetSelection,
    setAmount: fromAmount.setAmount,
    setAuthenticated: fromAuthenticated.setAuthenticated,
    setConnected: fromConnected.setConnected,
    setGameState: fromGameState.setGameState,
    setJoined: fromJoined.setJoined,
    setOtherAmount: fromOtherAmount.setOtherAmount,
    setOtherSelection: fromOtherSelection.setOtherSelection,
    setPaired: fromPaired.setPaired,
    setPresenceKey: fromPresenceKey.setPresenceKey,
    setSelected: fromSelected.setSelected,
    setSelection: fromSelection.setSelection,
  },
)(App);
