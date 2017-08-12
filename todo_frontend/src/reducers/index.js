import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import alertReducer from './alert.reducer';
import call_api from './call_api'
import test_reducer from './test_reducer'
import todoReducer from './todo.reducer';
import loginUser from './login-user';


const rootReducer = combineReducers({
  routing: routerReducer,
  call_api,
  test_reducer,
  todoReducer,
  loginUser,
  alertReducer
})

export default rootReducer
