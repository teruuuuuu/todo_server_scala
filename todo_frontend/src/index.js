import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history'

import StoreConfig from './store/store_config'
import { routes } from './routes';


injectTapEventPlugin();
const store = StoreConfig()


import './assets/temp.styl';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
render(
  <Provider store={store}>
    <Router history={appHistory} routes={routes} />
  </Provider>
  ,document.getElementById('root')
)
