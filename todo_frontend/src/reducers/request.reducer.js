import { Record } from 'immutable';

import {
  REQUEST_ENQUE,
  REQUEST_DEQUE
} from '../constants/action.define';

const InitialState = Record({
  requestQue: [],
});
const initialState = new InitialState;

export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_DEQUE: {
      if(state.requestQue.length > 0){
        return state.set('requestQue', state.requestQue.slice(1, state.requestQue.length));
      }else{
        return state.set('requestQue', []);
      }
    }
    case REQUEST_ENQUE: {
        state.requestQue.push(action.remote);
        var next = state.requestQue;
        return state.set('requestQue', next.slice(0));
      }
    default:
      return state.set('requestQue', []);
  }
}
