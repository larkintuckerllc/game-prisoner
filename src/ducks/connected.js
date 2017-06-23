import { ACTION_PREFIX } from '../strings';

// API
// ACTIONS
export const SET_CONNECTED = `${ACTION_PREFIX}SET_CONNECTED`;
// SCHEMA
// REDUCERS
export default (state = false, action) => {
  switch (action.type) {
    case SET_CONNECTED:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS AKA SELECTORS
export const getConnected = state => state.connected;
// VALIDATORS
const validConnected = value =>
  !(value === undefined || typeof value !== 'boolean');
// ACTION CREATORS
export const setConnected = (value) => {
  if (!validConnected(value)) throw new Error();
  return ({
    type: SET_CONNECTED,
    value,
  });
};
