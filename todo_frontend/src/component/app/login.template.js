import React, { PropTypes } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500} from 'material-ui/styles/colors';


const getChildContext = function(){
  var myTheme = getMuiTheme(lightBaseTheme);
  return myTheme;
}

const propTypes = {
  children: PropTypes.element.isRequired
};
const LoginTemplate = (props) => (
  <div>
    <MuiThemeProvider muiTheme={getChildContext()}>
      <main>
      {props.children}
      </main>
    </MuiThemeProvider>
  </div>
);

LoginTemplate.propTypes = propTypes;
export default LoginTemplate;
