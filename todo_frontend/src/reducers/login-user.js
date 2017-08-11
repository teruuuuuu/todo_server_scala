import { Record } from 'immutable';

/* eslint-disable new-cap */
const InitialState = Record({
  isLogin: false,
  familyName: '',
  firstName: ''
});
/* eslint-enable new-cap */
const initialState = new InitialState;

export default function loginUser(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
