import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as RemoteActions from '../../actions/remote';
import CircularProgress from 'material-ui/CircularProgress';


const spinnerStyle = {
  'position': 'absolute',
  'top': '40%',
  'left': '50%',
  'WebkitTransform': 'translateY(-50%) translateX(-50%)',
  'transform': 'translateY(-50%) translateX(-50%)',
  'padding': '20px%',
  'zIndex': '100'
}

function mapStateToProps(state) {
  return {
    requestReducer: state.requestReducer,
    todoReducer: state.todoReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( Object.assign({}, RemoteActions ), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class RequestAgent extends React.Component {
  state = {
    responseWait: false,
    currentAction: ''
  }
  static propTypes = {
    requestReducer: PropTypes.object,
    todoReducer: PropTypes.object
  }
  constructor(props) {
    super(props);
  }

  getCallBack(){
    alert("get callback");
  }

  postCallBack(){
    alert("post callback");
  }

  componentWillMount(){}
  componentWillReceiveProps(nextProps) {
    console.info(nextProps);
    if(this.props.requestReducer.requestQue.length > 0){
      if(this.props.requestReducer.requestQue[0] !== this.state.currentAction){
        this.state.currentAction = this.props.requestReducer.requestQue[0];
        this.props.requestDeque();
        this.props.callApi(this.state.currentAction);
      }
    }
  }



  render() {
    return (
      <div>
        {(() => {
          if (this.state.responseWait) {
            return <CircularProgress style={spinnerStyle}/>;
          }
        })()}
      </div>
    );
  }
}
