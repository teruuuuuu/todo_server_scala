import * as types from '../constants/ActionTypes'

//アクションクリエーター
export function change_text(text) {
  return { type: types.CHANGE_TEXT, text }
}
