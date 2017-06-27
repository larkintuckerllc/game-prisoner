import { ACTION_PREFIX } from '../strings';

// API
// ACTIONS
export const SET_OTHER_SELECTION = `${ACTION_PREFIX}SET_OTHER_SELECTION`;
// SCHEMA
// REDUCERS
export default (state = null, action) => {
  switch (action.type) {
    case SET_OTHER_SELECTION:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS AKA SELECTORS
export const getOtherSelection = state => state.otherSelection;
// VALIDATORS
const validOtherSelection = value =>
  !(value === undefined || typeof value !== 'boolean');
// ACTION CREATORS
export const setOtherSelection = (value) => {
  if (!validOtherSelection(value)) throw new Error();
  return ({
    type: SET_OTHER_SELECTION,
    value,
  });
};
