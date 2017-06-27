import { ACTION_PREFIX } from '../strings';

// API
// ACTIONS
export const SET_SCORE = `${ACTION_PREFIX}SET_SCORE`;
// SCHEMA
// REDUCERS
export default (state = 0, action) => {
  switch (action.type) {
    case SET_SCORE:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS AKA SELECTORS
export const getScore = state => state.score;
// VALIDATORS
const validScore = value =>
  !(value === undefined || typeof value !== 'number');
// ACTION CREATORS
export const setScore = (value) => {
  if (!validScore(value)) throw new Error();
  return ({
    type: SET_SCORE,
    value,
  });
};
