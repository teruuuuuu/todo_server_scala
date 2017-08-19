import { Record } from 'immutable';
import { COMMON_ALERT, COMMON_ALERT_CLOSE } from '../constants/action.define'

/* eslint-disable new-cap */
const InitialState = Record({
  open: false,
  message: ''
});
/* eslint-enable new-cap */
const initialState = new InitialState;
export default function alertReducer(state = initialState, action) {
  switch (action.type) {

    case COMMON_ALERT: {
      return Object.assign({}, state, { open: true, message: action.message})
    }

    case COMMON_ALERT_CLOSE: {
      return Object.assign({}, state, { open: false })
    }

    default:
      return state;
  }
}
