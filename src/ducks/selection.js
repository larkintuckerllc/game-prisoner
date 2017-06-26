import firebase from 'firebase/app';
import { ACTION_PREFIX } from '../strings';
import { getPresenceKey } from './presenceKey';

// API
// ACTIONS
export const SET_SELECTION = `${ACTION_PREFIX}SET_SELECTION`;
// SCHEMA
// REDUCERS
export default (state = null, action) => {
  switch (action.type) {
    case SET_SELECTION:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS AKA SELECTORS
export const getSelection = state => state.selection;
// VALIDATORS
const validSelection = value =>
  !(value === undefined || typeof value !== 'boolean');
// ACTION CREATORS
export const setSelection = value => (dispatch, getState) => {
  if (!validSelection(value)) throw new Error();
  const state = getState();
  const presenceKey = getPresenceKey(state);
  firebase.database().ref(`selection/${presenceKey}`).set(value).then(() => {
    dispatch({
      type: SET_SELECTION,
      value,
    });
  });
};
