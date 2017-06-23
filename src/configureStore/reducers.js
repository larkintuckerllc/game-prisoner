import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import appBlocking from '../ducks/appBlocking';
import connected from '../ducks/connected';
import presenceKey from '../ducks/presenceKey';

export default combineReducers({
  form: formReducer,
  appBlocking,
  connected,
  presenceKey,
});
