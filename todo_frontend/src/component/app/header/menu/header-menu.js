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
import TextField from 'material-ui/TextField';



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


export default class HeaderMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }

  static propTypes = {

  }


  render() {
    const {  } = this.props;
    const {  } = this.state;

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

      </div>
    );
  }
}
