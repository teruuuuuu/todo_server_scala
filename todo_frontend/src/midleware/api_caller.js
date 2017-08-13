import {CALL_API, END} from '../constants/action.define'
import * as RemoteService from '../remote/remote_todo'
import $      from 'jquery'



// ミドルウェアの宣言
const api_caller = function actionApiCall() {
  var savedNext = null;
  var connection = new WebSocket(REQUEST_URL.TODO_WEBSOCKET);
  var send = function () {

  };

  connection.onopen = function () {
  };
  connection.onerror = function (error) {
      console.log('WebSocket Error ', error);
  };
  connection.onmessage = function (event) {
    remoteService(savedNext, RemoteService.todo_init());
  };

  function remoteService(next, remote){
    savedNext = next;
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
          if([REQUEST_URL.TODO_ADD, REQUEST_URL.TODO_DELTE, REQUEST_URL.TODO_MOVE,
              REQUEST_URL.LIST_ADD,REQUEST_URL.LIST_DELETE, REQUEST_URL.LIST_ADD].indexOf(remote.url) >= 0){
                connection.send("update");
          }

          const new_action = remote.response_action(data)

          if(new_action.type == CALL_API){
            remoteService(next, new_action.remote)
          }else if(new_action.type == END){
          }else{
            next(new_action)
          }
        },
        error: data => {
          console.info(data)
        }
    });
  }

  return next => action => {
    if(action.type == CALL_API){
      remoteService(next, action.remote)
    }else{
      next(action)
    }
  };
};


export default api_caller
