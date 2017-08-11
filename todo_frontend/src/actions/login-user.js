import * as types from '../constants/ActionTypes'
import * as action from '../remote/login'

export function loginRequest(userId, password) {
  return { type: types.CALL_API, remote: action.login(userId, password)}
}
