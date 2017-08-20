import React, { Component, findDOMNode, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import * as CommonFunc from './func/common-func';

import * as ListsActions from '../../actions/todo.action';
import * as RemoteActions from '../../actions/remote';
import * as RemoteService from '../../actions/request/remote_todo'

const textStyle = {
  'background': 'rgba(0,0,0,.05)',
  'borderColor': '#aaa',
  'boxShadow': 'inset 0 1px 8px rgba(0,0,0,.15)'
};

const buttonStyle = {
  'marginTop': '5px'
};

const itemStyle = {
  'margin': '5px'
}

function mapStateToProps(state) {
  return {
    webSocket: state.todoWebsocket.webSocket,
    groupId: state.todoReducer.groupId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( Object.assign({}, ListsActions, RemoteActions), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class TodoListAdd extends Component {
  constructor(props, context) {
    super(props, context);
    this.addList = this.addList.bind(this);
  }

  static propTypes = {
  }

  addList(){
    const listText = this.refs.listText.getValue();
    this.props.requestEnque(RemoteService.list_add(this.props.groupId, listText), CommonFunc.callBack(this.props.webSocket));
  }


  render() {

    return (
      <div className="list-add">
        <div style={itemStyle}>
          <TextField hintText="リストを追加" style={textStyle} ref="listText"/><br />
          <RaisedButton label="追加" primary={true} style={buttonStyle} onClick={this.addList} />
        </div>
      </div>
    );
  }
}
