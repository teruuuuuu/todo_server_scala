import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import * as LoginAction from '../../../actions/login.action';

const headerStyle = {
};

export default class AppHeader extends Component {
  static propTypes = {}

  constructor(props, context) {
    super(props, context);
  }
  render(){
    return(
      <AppBar
        style={ headerStyle }
        title="TodoApp"
        iconElementRight={ <HeaderMenu />}
      />
    )
  }
}

const headerMenuStyle = {
  display: 'flex',
  alignItems: 'center'
};

const iconStyle = {
  color: '#FFF',
};

function mapStateToProps(state) {
  return {
    loginUser: state.loginUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( Object.assign({}, LoginAction ), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class HeaderMenu extends Component {

  static propTypes = {
    loginUser: PropTypes.object,
    logoutRequest: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.logoutRequest = this.logoutRequest.bind(this);
    console.info(this.props.loginUser);
  }


  logoutRequest(){
    this.props.logoutRequest()
  }

  render(){
    const { loginUser } = this.props;

    return(
      <div style={ headerMenuStyle }>
      <div>{ loginUser.familyName + " " + loginUser.firstName}</div>
      <IconMenu
        iconStyle={iconStyle}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="ログアウト" onTouchTap={this.logoutRequest}　/>
      </IconMenu>
      </div>
    )
  }
}
