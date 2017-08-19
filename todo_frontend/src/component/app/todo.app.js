import React, { PropTypes } from 'react';
/*
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500} from 'material-ui/styles/colors';
*/
import AppHeader from './header/app.header';

import Todo from '../todo'

/*
const getChildContext = function(){
  var myTheme = getMuiTheme(
    {appBar: {height: 46}}
  );
  return myTheme;
}
*/
const propTypes = {
};
const TodoApp = (props) => (
  <div >

      <main>
      <AppHeader />
      <Todo />
      </main>
    
  </div>
);

TodoApp.propTypes = propTypes;
export default TodoApp;
