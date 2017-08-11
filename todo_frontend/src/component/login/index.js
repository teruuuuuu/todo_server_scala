import React, { Component, findDOMNode, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


const loginAreaStyle = {
  'background': 'rgb(255, 255, 255)',
  'width': '320px',
  'text-align': 'center',
  'top': '40%',
  'position': 'absolute',
  'left': '50%',
  'transform': 'translateY(-50%) translateX(-50%)',
}

const titleStyle = {
  'margin': 'auto',
}

export default class LoginComponent extends Component {
  render() {

    return (
      <div >
        <div style={loginAreaStyle}>
          <div style={titleStyle}>LOGIN</div>
          <TextField hintText="user name" ref="listText"/><br />
          <TextField hintText="password" ref="listText"/><br />
        </div>
      </div>
    );
  }
}
