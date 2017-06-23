import { combineReducers } from 'redux';
import appBlocking from '../ducks/appBlocking';
import connected from '../ducks/connected';
import presenceKey from '../ducks/presenceKey';

export default combineReducers({
  appBlocking,
  connected,
  presenceKey,
});
