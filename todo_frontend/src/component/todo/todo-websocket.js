import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ListsActions from '../../actions/todo.action';
import * as RemoteActions from '../../actions/remote';
import * as RemoteService from '../../actions/request/remote_todo'

function mapStateToProps(state) {
  return {
    webSocket: state.todoWebsocket
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( Object.assign({}, ListsActions, RemoteActions ), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class TodoWebSocket extends Component {
  static propTypes = {
    onMessageFunc: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = { todoWebSocket: this.newWebSocket()};
  }

  componentWillMount() {
    this.props.initTodoWebSocketAction(this.state.todoWebSocket);
  }


  newWebSocket() {
    var WEBSOCKET_URL = "";
    if(PROD){
      WEBSOCKET_URL = "ws://" + location.host + REQUEST_URL.TODO_WEBSOCKET;
    }else{
      WEBSOCKET_URL = REQUEST_URL.TODO_WEBSOCKET;
    }
    var connection = new WebSocket(WEBSOCKET_URL);
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

  render() {
    return (
      <div>
      </div>
    );
  }
}
