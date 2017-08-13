import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( Object.assign({} ), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class RequestAgent extends React.Component {

  state = {
    responseWait: false
  }

  static propTypes = {
  }
  constructor(props) {
    super(props);
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
