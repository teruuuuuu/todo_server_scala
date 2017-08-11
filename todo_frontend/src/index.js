import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Route, Router, useRouterHistory, IndexRoute } from 'react-router';
import { createHashHistory } from 'history'

import StoreConfig from './store/store_config'

import AppTemplate from './component/app/app.template';
import LoginTemplate from './component/app/login.template';
import Todo from './component/todo';
import Login from './component/login';


injectTapEventPlugin();
const store = StoreConfig()

import './assets/temp.styl';

export const urls = {
  index: '/',
  todo: '/todo',
  login: '/login',
};

export const routes = (
  [
   <Route path={urls.index} component={AppTemplate}><IndexRoute component={Todo} /></Route>,
   <Route path={urls.login} component={LoginTemplate}><IndexRoute component={Login} /></Route>,
   <Route path={urls.todo} component={AppTemplate}><IndexRoute component={Todo} /></Route>]
);

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
render(
  <Provider store={store}>
    <Router history={appHistory} routes={routes} />
  </Provider>
  ,document.getElementById('root')
)
