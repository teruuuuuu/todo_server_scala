import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import * as CommonAlertAction from '../../actions/common-alert.action';

function mapStateToProps(state) {
  return {
    alertReducer: state.alertReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( Object.assign({}, CommonAlertAction ), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CommonAlert extends React.Component {
  static propTypes = {
    closeCommonAlert: PropTypes.func.isRequired,
    alertReducer: PropTypes.object
  }
  constructor(props) {
    super(props);
    console.info(props);
  }

  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    //this.setState({open: false});
    this.props.closeCommonAlert();
  };

  render() {
    console.info(this);
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.alertReducer.open}
          onRequestClose={this.handleClose}
        >
          {this.props.alertReducer.message}
        </Dialog>
      </div>
    );
  }
}
