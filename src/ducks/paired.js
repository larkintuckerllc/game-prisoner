import { ACTION_PREFIX } from '../strings';

// API
// ACTIONS
export const SET_PAIRED = `${ACTION_PREFIX}SET_PAIRED`;
// SCHEMA
// REDUCERS
export default (state = null, action) => {
  switch (action.type) {
    case SET_PAIRED:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS AKA SELECTORS
export const getPaired = state => state.paired;
// VALIDATORS
const validPaired = value =>
  !(value === undefined || typeof value !== 'string');
// ACTION CREATORS
export const setPaired = (value) => {
  if (!validPaired(value)) throw new Error();
  return ({
    type: SET_PAIRED,
    value,
  });
};
export const resetPaired = () => ({
  type: SET_PAIRED,
  value: null,
});
