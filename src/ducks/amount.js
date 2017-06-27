import { ACTION_PREFIX } from '../strings';

// API
// ACTIONS
export const SET_AMOUNT = `${ACTION_PREFIX}SET_AMOUNT`;
// SCHEMA
// REDUCERS
export default (state = null, action) => {
  switch (action.type) {
    case SET_AMOUNT:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS AKA SELECTORS
export const getAmount = state => state.amount;
// VALIDATORS
const validAmount = value =>
  !(value === undefined || typeof value !== 'number');
// ACTION CREATORS
export const setAmount = (value) => {
  if (!validAmount(value)) throw new Error();
  return ({
    type: SET_AMOUNT,
    value,
  });
};
