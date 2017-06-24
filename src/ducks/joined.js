import { ACTION_PREFIX } from '../strings';

// API
// ACTIONS
export const SET_JOINED = `${ACTION_PREFIX}SET_JOINED`;
// SCHEMA
// REDUCERS
export default (state = false, action) => {
  switch (action.type) {
    case SET_JOINED:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS AKA SELECTORS
export const getJoined = state => state.joined;
// VALIDATORS
const validJoined = value =>
  !(value === undefined || typeof value !== 'boolean');
// ACTION CREATORS
export const setJoined = (value) => {
  if (!validJoined(value)) throw new Error();
  return ({
    type: SET_JOINED,
    value,
  });
};
