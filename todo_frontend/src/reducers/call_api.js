import {CALL_API } from '../constants/ActionTypes'


const initialState = {
}

export default function nlp_page(state = initialState, action) {
  switch (action.type) {
    case CALL_API:
      return state
    default:
      return state
  }
}
