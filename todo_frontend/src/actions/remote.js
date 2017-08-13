import * as types from '../constants/action.define'

import {
  CALL_API,
  REQUEST_ENQUE,
  REQUEST_DEQUE
} from '../constants/action.define';

export function callApi(remote, callBack) {
  return dispatch => {
    dispatch({ type: CALL_API, remote: Object.assign({}, remote, { 'callBack': callBack})})
  }
}

export function requestEnque(remote) {
  return dispatch => {
    dispatch({ type: REQUEST_ENQUE, remote:remote})
  }
}

export function requestDeque() {
  return dispatch => {
    dispatch({ type: REQUEST_DEQUE})
  }
}
