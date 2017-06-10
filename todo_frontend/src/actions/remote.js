import * as types from '../constants/ActionTypes'

export function callApi(remote) {
  return { type: types.CALL_API, remote:remote}
}
