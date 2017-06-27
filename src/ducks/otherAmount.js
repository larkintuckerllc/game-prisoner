import { ACTION_PREFIX } from '../strings';

// API
// ACTIONS
export const SET_OTHER_AMOUNT = `${ACTION_PREFIX}SET_OTHER_AMOUNT`;
// SCHEMA
// REDUCERS
export default (state = null, action) => {
  switch (action.type) {
    case SET_OTHER_AMOUNT:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS AKA SELECTORS
export const getOtherAmount = state => state.otherAmount;
// VALIDATORS
const validOtherAmount = value =>
  !(value === undefined || typeof value !== 'number');
// ACTION CREATORS
export const setOtherAmount = (value) => {
  if (!validOtherAmount(value)) throw new Error();
  return ({
    type: SET_OTHER_AMOUNT,
    value,
  });
};
