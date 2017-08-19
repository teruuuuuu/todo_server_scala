import React, { Component, findDOMNode, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CommonFunc from '../func/common-func';

import * as ListsActions from '../../../actions/todo.action';
import * as RemoteActions from '../../../actions/remote';
import * as RemoteService from '../../../actions/request/remote_todo'

const galPng = require('../../../assets/images/gal.png');
const delPng = require('../../../assets/images/del.png');


function mapStateToProps(state) {
  return {
    webSocket: state.todoWebsocket.webSocket
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( Object.assign({}, ListsActions, RemoteActions), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Card extends Component {
  constructor(props, context) {
    super(props, context);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  static propTypes = {
    deleteTodo: PropTypes.func,
    style: PropTypes.object,
    item: PropTypes.object.isRequired,
    key: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number,
    webSocket: PropTypes.object
  }

  deleteTodo(){
    this.props.requestEnque(RemoteService.todo_delete(-1, this.props.item.id), CommonFunc.callBack(this.props.webSocket));
  }

  render() {
    const { style, item} = this.props;
    return (
      <div style={style} className="item" id={style ? item.id : null}>
        <div className="item-name">{item.title}</div>
        <div className="item-container">
          <div className="item-content">
            <p>{item.text}</p>
          </div>
        </div>
        <div className="item-perfomers">
          <div className="add-perfomers">
            <a onClick={this.deleteTodo}><img src={delPng} alt="Delete perfomers" /></a>
          </div>
        </div>
      </div>
    );
  }
}
