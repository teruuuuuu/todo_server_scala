import { CHANGE_TEXT } from '../constants/ActionTypes'

const initialState =
  {
    text : 'initial text'
  };

export default function test_reducer(state = initialState, action) {
  switch (action.type) {

    case CHANGE_TEXT:
      return Object.assign({}, state, { text: action.text})

    default:
      return state
  }
}
