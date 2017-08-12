import React, { Component, findDOMNode, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import * as LoginAction from '../../actions/login.action';
import * as RemoteActions from '../../actions/remote';
import * as RemoteService from '../../remote/login'

const loginAreaStyle = {
  'background': 'rgb(255, 255, 255)',
  'width': '320px',
  'textAlign': 'center',
  'top': '40%',
  'position': 'absolute',
  'left': '50%',
  'padding': '30px',
  'transform': 'translateY(-50%) translateX(-50%)',
}

const titleStyle = {
  'margin': 'auto',
}

const buttonStyle = {
  'marginTop': '15px',
}


function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( Object.assign({}, LoginAction, RemoteActions ), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginComponent extends Component {

  static propTypes = {
    callApi: PropTypes.func.isRequired,
    loginRequest: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.loginRequest = this.loginRequest.bind(this);
  }

  loginRequest(){
    //this.props.loginRequest();
    const userId = this.refs.userId.getValue();
    const password = this.refs.password.getValue();
    this.props.callApi(RemoteService.login(userId, password));
  }

  render() {
    return (
      <div >
        <div style={loginAreaStyle}>
          <div style={titleStyle}>LOGIN</div>
          <TextField hintText="user id" ref="userId"/><br />
          <TextField hintText="password" ref="password"/><br />
          <RaisedButton label="ログイン" primary={true} style={buttonStyle} onClick={this.loginRequest} />
        </div>
      </div>
    );
  }
}
