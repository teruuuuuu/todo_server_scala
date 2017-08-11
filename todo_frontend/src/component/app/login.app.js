import React, { PropTypes } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500} from 'material-ui/styles/colors';

import Login from '../login';

const getChildContext = function(){
  var myTheme = getMuiTheme(lightBaseTheme);
  return myTheme;
}

//import { withRouter } from 'react-router-dom'
// this also works with react-router-native

const propTypes = {
};
const LoginApp = (props) => (
  <div>
    <MuiThemeProvider muiTheme={getChildContext()}>
      <main>
        <Login />
      </main>
    </MuiThemeProvider>
  </div>
);

LoginApp.propTypes = propTypes;
export default LoginApp;
