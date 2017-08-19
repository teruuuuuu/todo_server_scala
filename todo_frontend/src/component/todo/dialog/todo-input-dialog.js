/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import MenuItem from 'material-ui/MenuItem';


class TodoDialog extends Component {
  constructor(props, context) {
    super(props, context);
    this.clickOk = this.clickOk.bind(this);
    this.state = {
      title: '',
      text: '',
    };
  }

  static propTypes = {
    clickOk: PropTypes.func.isRequired,
    handleRequestClose: PropTypes.func.isRequired,
    componentId: PropTypes.number,
    open: PropTypes.bool,
  }

  clickOk() {
    const title = this.refs.title.getValue();
    const text = this.refs.text.getValue();

    if(title.length > 0 && text.length > 0){
      this.props.clickOk({"title": title, "text": text});
    }
  }

  render() {
    const {
      open
    } = this.props



    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.clickOk}
      />
    );

    return (
      <div >
        <Dialog
          open={open}
          title="TODO追加"
          actions={standardActions}
          onRequestClose={this.props.handleRequestClose}
        >
          <TextField hintText="title" ref="title" /><br />
          <TextField hintText="text"ref="text" multiLine={true} rows={1} /><br />
        </Dialog>
      </div>
    );
  }
}
export default TodoDialog
