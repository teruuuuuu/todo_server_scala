import * as types from '../constants/action.define'

export function callApi(remote) {
  return { type: types.CALL_API, remote:remote}
}
