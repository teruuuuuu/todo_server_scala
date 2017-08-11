import React, { PropTypes } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500} from 'material-ui/styles/colors';

import AppHeader from './app.header';

const getChildContext = function(){
  var myTheme = getMuiTheme(lightBaseTheme);
  return myTheme;
}

const propTypes = {
  children: PropTypes.element.isRequired
};
const AppTemplate = (props) => (
  <div >
    <MuiThemeProvider muiTheme={getChildContext()}>
      <main>
      <AppHeader />
      {props.children}
      </main>
    </MuiThemeProvider>
  </div>
);

AppTemplate.propTypes = propTypes;
export default AppTemplate;
