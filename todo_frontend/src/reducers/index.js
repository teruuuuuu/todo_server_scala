import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import alertReducer from './alert.reducer';
import call_api from './call_api'
import test_reducer from './test_reducer'
import todoReducer from './todo.reducer';
import todoWebsocket from './todo.websocket';
import loginUser from './login-user';
import requestReducer from './request.reducer';


const rootReducer = combineReducers({
  routing: routerReducer,
  call_api,
  test_reducer,
  todoReducer,
  loginUser,
  alertReducer,
  requestReducer,
  todoWebsocket
})

export default rootReducer
