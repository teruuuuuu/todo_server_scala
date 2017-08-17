import * as types from '../constants/action.define'
import * as action from './request/login'

export function loginRequest(userId, password) {
  //return { type: types.CALL_API, remote: action.login(userId, password)}
  return { type: types.LOGIN, true }
}

export function logoutRequest() {
  //return { type: types.CALL_API, remote: action.login(userId, password)}
  return { type: types.LOGOUT, false }
}
