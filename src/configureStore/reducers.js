import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import connected from '../ducks/connected';
import presenceKey from '../ducks/presenceKey';

export default combineReducers({
  form: formReducer,
  connected,
  presenceKey,
});
