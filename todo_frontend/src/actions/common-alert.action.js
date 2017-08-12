import * as types from '../constants/action.define'

export function openCommonAlert(message) {
  return { type: types.COMMON_ALERT, message }
}

export function closeCommonAlert() {
  return { type: types.COMMON_ALERT_CLOSE }
}
