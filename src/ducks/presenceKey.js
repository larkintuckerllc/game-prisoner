import { ACTION_PREFIX } from '../strings';

// API
// ACTIONS
export const SET_PRESENCE_KEY = `${ACTION_PREFIX}SET_PRESENCE_KEY`;
// SCHEMA
// REDUCERS
export default (state = null, action) => {
  switch (action.type) {
    case SET_PRESENCE_KEY:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS AKA SELECTORS
export const getPresenceKey = state => state.presenceKey;
// VALIDATORS
const validPresenceKey = value =>
  !(value === undefined || typeof value !== 'string');
// ACTION CREATORS
export const setPresenceKey = (value) => {
  if (!validPresenceKey(value)) throw new Error();
  return ({
    type: SET_PRESENCE_KEY,
    value,
  });
};
