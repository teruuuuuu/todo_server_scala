import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
//import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
//import { Route, Router, useRouterHistory, IndexRoute } from 'react-router';
//import { createHashHistory } from 'history'
//import { createBrowserHistory } from 'history'

import StoreConfig from './store/store_config'

import AppRouter from './component/app/app.router';
//import TodoApp from './component/app/todo.app';
//import LoginApp from './component/app/login.app';

injectTapEventPlugin();
const store = StoreConfig()

import './assets/temp.styl';


render(
  <Provider store={store}>
  <BrowserRouter >
    <Switch>
      <Route exact path="/" component={AppRouter}/>
    </Switch>
  </BrowserRouter>
  </Provider>

  ,document.getElementById('root')
)
