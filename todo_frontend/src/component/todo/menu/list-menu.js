import React, { Component, PropTypes } from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import TodoDialog from '../dialog/todo-input-dialog';

import * as CommonFunc from '../func/common-func';

import * as ListsActions from '../../../actions/todo.action';
import * as RemoteActions from '../../../actions/remote';
import * as RemoteService from '../../../actions/request/remote_todo'


const menuStyle = {
  float: 'right',

};

const iconStyle = {
  color: '#999',
};

const buttonStyle = {
  padding: '0px',
  height: '24px',
  width: '24px'
}

function mapStateToProps(state) {
  return {
    webSocket: state.todoWebsocket.webSocket,
    groupId: state.todoReducer.groupId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( Object.assign({}, ListsActions, RemoteActions), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ListMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.clickOk = this.clickOk.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false
    };
  }

  static propTypes = {
    componentId: PropTypes.number,
    id: PropTypes.number,
    webSocket: PropTypes.object,
    groupId: PropTypes.number.isRequired,
    requestEnque:  PropTypes.func.isRequired
  }


  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  clickOk(data) {
    const { id } = this.props;
    this.props.requestEnque(RemoteService.todo_add( id, data.title, data.text), CommonFunc.callBack(this.props.webSocket));
    this.setState({open: false});
  }

  deleteList(){
    this.props.requestEnque(RemoteService.list_delete(this.props.groupId, this.props.id), CommonFunc.callBack(this.props.webSocket));
  }

  render() {
    const { id } = this.props;
    const { open } = this.state;

    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.clickOk}
      />
    );

    return (
      <div style={{ display: "inline" }}>
        <IconMenu
          style={menuStyle}
          iconStyle={iconStyle}
          iconButtonElement={<IconButton style={buttonStyle}><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <MenuItem primaryText="カードを追加"　onTouchTap={this.handleTouchTap} />
          <MenuItem primaryText="リストを削除" onTouchTap={this.deleteList}/>
        </IconMenu>

        <TodoDialog open={open} handleRequestClose={this.handleRequestClose} clickOk={this.clickOk}/>
      </div>
    );
  }
}
