import {CALL_API, END} from '../constants/action.define'
import * as RemoteService from '../actions/request/remote_todo'
import $      from 'jquery'

// ミドルウェアの宣言
const api_caller = function actionApiCall() {

  function remoteService(next, remote){
    $.ajax({
        url: remote.url,
        dataType: remote.dataType,
        type: remote.type,
        data: remote.data,
        cache: false,
        scriptCharset: 'utf-8',
        xhrFields: {withCredentials: true},
        //contentType: remote.contentType,
        success: function(data, status, xhr){
          callBackSeq(data, status, xhr, remote.callBackQue);

          const new_action = remote.response_action(data)

          if(new_action.type == CALL_API){
            remoteService(next, new_action.remote)
          }else if(new_action.type == END){
          }else{
            next(new_action)
          }
        },
        error: data => {
          callBackSeq(remote.callBackQue);
          console.info(data)
        }
    });
  }

  function callBackSeq(data, status, xhr, callBackQue) {
    if(callBackQue !== void 0 && callBackQue.length > 0){
      while(callBackQue.length > 0){
        callBackQue[0](data, status, xhr);
        callBackQue = callBackQue.slice(1, callBackQue.length);
      }
    }
  }

  return next => action => {
    if(action.type == CALL_API) {
      remoteService(next, action.remote)
    } else if(action.type == END) {
    } else { next(action) }
  };
};


export default api_caller
