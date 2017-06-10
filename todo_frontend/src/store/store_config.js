import { createStore, applyMiddleware  } from 'redux'
import rootReducer from '../reducers/index'

import thunk from "redux-thunk"
import logger from '../midleware/logger'
import api_caller from '../midleware/api_caller'

import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';



//index.jsxで呼び出す
export default function StoreConfig(preloadedState) {

  // applyMiddlewareに指定
  const reduxRouterMiddleware = routerMiddleware(browserHistory);
  const finalCreateStore = applyMiddleware(thunk, logger, api_caller, reduxRouterMiddleware)(createStore);
  const store = finalCreateStore(rootReducer, preloadedState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
