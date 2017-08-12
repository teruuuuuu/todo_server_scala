import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500} from 'material-ui/styles/colors';

import Login from './login.app';
import TodoApp from './todo.app';

import CommonAlert from '../shared/common-alert';


const getChildContext = function(){
  var myTheme = getMuiTheme(
    {appBar: {height: 46}}
  );
  return myTheme;
}

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
        <div>
          <Login/>
          <CommonAlert />
        </div>
      );
    }else{
      return (
        <div>
          <TodoApp/>
          <CommonAlert />
        </div>
      );
    }
  }

  render() {

    return(
      <div>
        <MuiThemeProvider muiTheme={getChildContext()}>
          { this.pageSwitch() }
        </MuiThemeProvider >
      </div>
    )
  }
}

//AppRouter.propTypes = propTypes;
//export default AppRouter;
