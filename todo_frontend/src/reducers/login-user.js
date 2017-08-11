import { Record } from 'immutable';

import { LOGIN, LOGOUT } from '../constants/action.define'

/* eslint-disable new-cap */
const InitialState = Record({
  isLogin: false,
  familyName: 'familyName',
  firstName: 'firstName'
});
/* eslint-enable new-cap */
const initialState = new InitialState;
export default function loginUser(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return state.set('isLogin', true);
    }

    case LOGOUT: {
      return state.set('isLogin', false);
    }

    default:
      return state;
  }
}
