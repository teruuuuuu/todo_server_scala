import * as types from '../constants/action.define'

//アクションクリエーター
export function change_text(text) {
  return { type: types.CHANGE_TEXT, text }
}
