import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authenticated from '../ducks/authenticated';
import connected from '../ducks/connected';
import joined from '../ducks/joined';
import gameState from '../ducks/gameState';
import messages from '../ducks/messages';
import otherSelection from '../ducks/otherSelection';
import paired from '../ducks/paired';
import presenceKey from '../ducks/presenceKey';
import selected from '../ducks/selected';
import selection from '../ducks/selection';

export default combineReducers({
  authenticated,
  connected,
  form: formReducer,
  joined,
  gameState,
  messages,
  otherSelection,
  paired,
  presenceKey,
  selected,
  selection,
});
