import { ACTION_PREFIX } from '../strings';

// API
// ACTIONS
export const SET_SELECTED = `${ACTION_PREFIX}SET_SELECTED`;
// SCHEMA
// REDUCERS
export default (state = false, action) => {
  switch (action.type) {
    case SET_SELECTED:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS AKA SELECTORS
export const getSelected = state => state.selected;
// VALIDATORS
const validSelected = value =>
  !(value === undefined || typeof value !== 'boolean');
// ACTION CREATORS
export const setSelected = (value) => {
  if (!validSelected(value)) throw new Error();
  return ({
    type: SET_SELECTED,
    value,
  });
};
