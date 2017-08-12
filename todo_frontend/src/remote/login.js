import createRequestData from './common'
import * as types from '../constants/action.define'

import * as CommonAlertAction from '../actions/common-alert.action';

export function  login(userId, password) {
  const response_action = function(data){
    if(data.seq_num > 0){
      return {type: types.LOGIN, data: data}
    }else{
      return CommonAlertAction.openCommonAlert('ユーザIDまたはパスワードが間違っています')
    }

  }

  const data = {
    "user_id": userId,
    "password": password,
  }
  return createRequestData( REQUEST_URL.LOGIN, 'JSON', 'post',  data,  response_action);
}
