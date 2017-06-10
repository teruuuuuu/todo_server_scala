import React, { Component, PropTypes } from 'react';
import { DropTarget, DragSource } from 'react-dnd';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'

import TodoInputDialog from '../dialog/TodoInputDialog'


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
    id: PropTypes.number,
    addTodo: PropTypes.func.isRequired,
    deleteList: PropTypes.func.isRequired
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
    const { id } = this.props
    this.props.addTodo(Object.assign({}, data, { componentId: id}));

    this.setState({
      open: false,
    });
  }

  deleteList(){
    const { id } = this.props
    this.props.deleteList(id);
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

        <TodoInputDialog open={open} handleRequestClose={this.handleRequestClose} clickOk={this.clickOk}/>
      </div>
    );
  }
}
