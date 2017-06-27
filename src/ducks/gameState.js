import { ACTION_PREFIX } from '../strings';

// GAME_STATES
export const JOIN = 'JOIN';
export const STARTING = 'STARTING';
export const PAIRED = 'PAIRED';
export const SELECTING = 'SELECTING';
export const SCORE = 'SCORE';
// API
// ACTIONS
export const SET_GAME_STATE = `${ACTION_PREFIX}SET_GAME_STATE`;
// SCHEMA
// REDUCERS
export default (state = null, action) => {
  switch (action.type) {
    case SET_GAME_STATE:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS AKA SELECTORS
export const getGameState = state => state.gameState;
// VALIDATORS
const validGameState = value =>
  !(value === undefined || typeof value !== 'string');
// ACTION CREATORS
export const setGameState = (value) => {
  if (!validGameState(value)) throw new Error();
  return ({
    type: SET_GAME_STATE,
    value,
  });
};
