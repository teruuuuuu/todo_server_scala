import React, { Component, findDOMNode, PropTypes } from 'react';

export default class TodoWebSocket extends Component {
  static propTypes = {
    onMessageFunc: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = { todoWebSocket: this.newWebSocket()};
  }

  newWebSocket() {
    var WEBSOCKET_URL = "";
    if(PROD){
      WEBSOCKET_URL = "ws://" + location.host + REQUEST_URL.TODO_WEBSOCKET;
    }else{
      WEBSOCKET_URL = REQUEST_URL.TODO_WEBSOCKET;
    }
    var connection = new WebSocket(WEBSOCKET_URL);
    var send = function () {};
    connection.onopen = this.webSockOnOpen;
    connection.onerror = this.webSockOnError;
    connection.onmessage = this.createOnMessage(this.props.onMessageFunc);
    return connection;
  }

  webSockOnOpen() {}
  webSockOnError(error) {}
  createOnMessage(onMessageFunc){
    function onMessage() {
      onMessageFunc();
    }
    return onMessage;
  }

  createSend(webSocket){
    function send(data, status, xhr){
      console.info(xhr);
      webSocket.send("update");
    }
    return send;
  }


  render() {
    return (
      <div>
      </div>
    );
  }
}
