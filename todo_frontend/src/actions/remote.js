import * as types from '../constants/action.define'

import {
  CALL_API,
  REQUEST_ENQUE,
  REQUEST_DEQUE
} from '../constants/action.define';

export function callApi(remote, callBack) {
  return dispatch => {
    dispatch({ type: CALL_API,
      remote: Object.assign({}, remote, { 'callBackQue': addQue(remote['callBackQue'], callBack) })})
  }
}

export function requestEnque(remote, callBack) {
  return dispatch => {
    dispatch({ type: CALL_API,
      remote: Object.assign({}, remote, { 'callBackQue': addQue(remote['callBackQue'], callBack) })})
  }
}

export function requestDeque() {
  return dispatch => {
    dispatch({ type: REQUEST_DEQUE})
  }
}

function addQue(que, value){
  var newQue = que == void 0 ? [] : que;
  if(value !== void 0) {
    newQue.push(value);
  }
  return newQue;
}
