import createRequestData from './common'
import * as types from '../constants/loginRequestType'

export function  login(userId, password) {
  const response_action = function(data){
    return {type: types.LOGIN, data: data}
  }

  const data = {
    "user_id": userId,
    "password": password,
  }
  return createRequestData( REQUEST_URL.LOGIN, 'JSON', 'post',  data,  response_action);
}
