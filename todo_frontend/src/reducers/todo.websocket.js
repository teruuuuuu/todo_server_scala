import { Record } from 'immutable';

import {
  INIT_TODO_WEBSOCKET
} from '../constants/action.define';

const InitialState = Record({
  webSocket: null
});
const initialState = new InitialState;

export default function todoWebsocket(state = initialState, action) {
  switch (action.type) {
    case INIT_TODO_WEBSOCKET:
      return Object.assign({}, state, { webSocket: action.connection})
    default:
      return state;
  }
}
