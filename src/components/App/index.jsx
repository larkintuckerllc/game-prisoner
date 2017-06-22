import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import * as fromAppBlocking from '../../ducks/appBlocking';

// eslint-disable-next-line
class App extends Component {
  componentDidMount() {
    const config = {
      apiKey: 'AIzaSyD0xUucxtbfOc_0lp_w4nv69LIle2HTnNU',
      authDomain: 'game-prisoner.firebaseapp.com',
      databaseURL: 'https://game-prisoner.firebaseio.com',
      projectId: 'game-prisoner',
      storageBucket: 'game-prisoner.appspot.com',
      messagingSenderId: '416710348817',
    };
    try {
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged((user) => {
        if (user !== null) {
          window.console.log('logged in');
        }
      });
      firebase.auth().signInWithEmailAndPassword(
        'player@game.prisoner',
        'GPonly00',
      );
    } catch (err) {
      // TODO: IMPLEMENT ERROR
    }
    /*
            const presenceRef = firebase.database().ref('presence');
            const logRef = firebase.database().ref('log');
            const connectedRef = firebase.database().ref('.info/connected');
            connectedRef.on('value', snap => {
              if (snap.val() === true) {
                presenceRef.push(screen.id);
                logRef.push({
                  id: screen.id,
                  title: screen.title,
                  status: 'up',
                  timestamp: firebase.database.ServerValue.TIMESTAMP,
                });
                const disconnectRef = logRef.push();
                presenceRef.onDisconnect().remove();
                disconnectRef.onDisconnect().set({
                  id: screen.id,
                  title: screen.title,
                  status: 'down',
                  timestamp: firebase.database.ServerValue.TIMESTAMP,
                });
                setConnected(true);
              } else {
                setConnected(false);
              }
            });
          }
        });
        firebase.auth().signInWithEmailAndPassword(
          nextMonitor.email,
          nextMonitor.password
        );
      });
    } catch (err) {
      // DO NOTHING
    }
    */
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
