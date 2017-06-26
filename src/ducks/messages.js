import { combineReducers } from 'redux';
import { normalize, schema } from 'normalizr';
import { createSelector } from 'reselect';
import uuidv1 from 'uuid/v1';
import { ACTION_PREFIX } from '../strings';

// API
// REDUCER MOUNT POINT
const reducerMountPoint = 'messages';
// ACTIONS
export const ADD_MESSAGE_SUCCESS = `${ACTION_PREFIX}ADD_MESSAGE_SUCCESS`;
// SCHEMA
const messageSchema = new schema.Entity('messages');
// REDUCERS
const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_MESSAGE_SUCCESS:
      return {
        ...state,
        ...action.response.entities.messages,
      };
    default:
      return state;
  }
};
const ids = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE_SUCCESS:
      return [...state, action.response.result];
    default:
      return state;
  }
};
export default combineReducers({
  byId,
  ids,
});
// ACCESSORS AKA SELECTORS
const getMessagesIds = state => state[reducerMountPoint].ids;
const getMessagesById = state => state[reducerMountPoint].byId;
export const getMessages = createSelector(
  [getMessagesIds, getMessagesById],
  (messagesIds, messagesById) => messagesIds.map(id => messagesById[id]),
);
// ACTION CREATOR VALIDATORS
const validMessage = message =>
  !(message === undefined
  || message.body === undefined
  || typeof message.body !== 'string'
  || message.self === undefined
  || typeof message.self !== 'boolean');
// ACTION CREATORS
export const addMessage = (message) => {
  if (!validMessage(message)) throw new Error();
  return ({
    type: ADD_MESSAGE_SUCCESS,
    response: normalize({
      id: uuidv1(),
      ...message,
    }, messageSchema),
  });
};
