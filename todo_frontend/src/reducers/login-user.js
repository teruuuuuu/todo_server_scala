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
      if(action.data.seq_num > 0){
        return state.set('isLogin', true)
            .set('familyName', action.data.family_name)
            .set('firstName', action.data.first_name);
      }else{
        return state;
      }
    }

    case LOGOUT: {
      return state.set('isLogin', false);
    }

    default:
      return state;
  }
}
