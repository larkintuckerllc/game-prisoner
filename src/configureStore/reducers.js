import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import amount from '../ducks/amount';
import authenticated from '../ducks/authenticated';
import connected from '../ducks/connected';
import joined from '../ducks/joined';
import gameState from '../ducks/gameState';
import messages from '../ducks/messages';
import otherAmount from '../ducks/otherAmount';
import otherSelection from '../ducks/otherSelection';
import paired from '../ducks/paired';
import presenceKey from '../ducks/presenceKey';
import score from '../ducks/score';
import selected from '../ducks/selected';
import selection from '../ducks/selection';

export default combineReducers({
  amount,
  authenticated,
  connected,
  form: formReducer,
  joined,
  gameState,
  messages,
  otherAmount,
  otherSelection,
  paired,
  presenceKey,
  score,
  selected,
  selection,
});
