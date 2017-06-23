import { ACTION_PREFIX } from '../strings';

// API
// ACTIONS
export const SET_AUTHENTICATED = `${ACTION_PREFIX}SET_AUTHENTICATED`;
// SCHEMA
// REDUCERS
export default (state = false, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS AKA SELECTORS
export const getAuthenticated = state => state.authenticated;
// VALIDATORS
const validAuthenticated = value =>
  !(value === undefined || typeof value !== 'boolean');
// ACTION CREATORS
export const setAuthenticated = (value) => {
  if (!validAuthenticated(value)) throw new Error();
  return ({
    type: SET_AUTHENTICATED,
    value,
  });
};
