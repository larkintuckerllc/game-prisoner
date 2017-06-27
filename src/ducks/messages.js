import { combineReducers } from 'redux';
import { normalize, schema } from 'normalizr';
import { createSelector } from 'reselect';
import uuidv1 from 'uuid/v1';
import firebase from 'firebase/app';
import { ACTION_PREFIX } from '../strings';
import { getPaired } from './paired';

// API
// REDUCER MOUNT POINT
const reducerMountPoint = 'messages';
// ACTIONS
export const ADD_MESSAGE_SUCCESS = `${ACTION_PREFIX}ADD_MESSAGE_SUCCESS`;
export const RESET_MESSAGES = `${ACTION_PREFIX}RESET_MESSAGES`;
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
    case RESET_MESSAGES:
      return {};
    default:
      return state;
  }
};
const ids = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE_SUCCESS:
      return [...state, action.response.result];
    case RESET_MESSAGES:
      return [];
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
export const addMessage = message => (dispatch, getState) => {
  if (!validMessage(message)) throw new Error();
  const state = getState();
  const paired = getPaired(state);
  if (message.self) {
    firebase.database().ref(`messages/${paired}`).push(message.body).then(() => {
      dispatch({
        type: ADD_MESSAGE_SUCCESS,
        response: normalize({
          id: uuidv1(),
          ...message,
        }, messageSchema),
      });
    });
  } else {
    dispatch({
      type: ADD_MESSAGE_SUCCESS,
      response: normalize({
        id: uuidv1(),
        ...message,
      }, messageSchema),
    });
  }
};
export const resetMessages = () => ({
  type: RESET_MESSAGES,
});
