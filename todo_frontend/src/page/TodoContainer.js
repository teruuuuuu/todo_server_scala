import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MaterialHeader from '../component/header/MaterialHeader';
import Board from './Board';


export default class TodoContainer extends Component {
  render() {

    return (
      <div style={{ height: '100%' }}>
        <MaterialHeader />
        <Board />
      </div>
    );
  }
}
