import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Login from './login.app';
import TodoApp from './todo.app';

function mapStateToProps(state) {
  return {
    loginUser: state.loginUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( Object.assign({}), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AppRouter extends Component {
  constructor(props, context) {
    super(props);
    console.info(this.props.loginUser.isLogin);
  }

  pageSwitch(){
    if(!this.props.loginUser.isLogin){
      return (
        <Login/>
      );
    }else{
      return (
        <TodoApp/>
      );
    }
  }

  render() {

    return(
      <div>
      { this.pageSwitch() }
      </div>
    )
  }
}

//AppRouter.propTypes = propTypes;
//export default AppRouter;
