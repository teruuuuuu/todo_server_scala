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


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

class MaterialDialog extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.clickOk = this.clickOk.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
      title: '',
      text: '',
    };
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

  clickOk() {
    if(this.state.title.length > 0 && this.state.text.length > 0){
      this.props.onCommentSubmit(this.state.title, this.state.text);
    }
    this.setState({ title: '' });
    this.setState({ text: '' });
    this.setState({
      open: false,
    });
  }

  titleInput(e) {
     this.setState({ title: e.target.value });
  }

  textInput(e) {
     this.setState({ text: e.target.value });
  }

  render() {
    const {
    } = this.props

    const {
      title,
      text
    } = this.state

    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.clickOk}
      />
    );

    return (
      <div style={styles.container}>
        <TextField hintText="The hint text can be as long as you want, it will wrap."  /><br />
        <TextField hintText="Message Field" multiLine={true} rows={1} /><br />
        <Dialog
          open={this.state.open}
          title="input dialog"
          actions={standardActions}
          onRequestClose={this.handleRequestClose}
        >
          <DatePicker hintText="Date Picker" />
          <TextField hintText="title" value = { title } onChange = { this.titleInput.bind(this) } /><br />
          <TextField hintText="text"value = { text } onChange = { this.textInput.bind(this) }/><br />
        </Dialog>
        <h1>Material-UI</h1>
        <h2>example project</h2>
        <RaisedButton
          label="Super Secret Password"
          secondary={true}
          onTouchTap={this.handleTouchTap}
        /><br />
        <FloatingActionButton secondary={true} onTouchTap={this.handleTouchTap}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

MaterialDialog.propTypes = {
  onCommentSubmit: PropTypes.func.isRequired,
}

export default MaterialDialog
