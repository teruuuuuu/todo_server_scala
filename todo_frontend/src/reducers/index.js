import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import call_api from './call_api'
import test_reducer from './test_reducer'
import lists from './lists';


const rootReducer = combineReducers({
  routing: routerReducer,
  call_api,
  test_reducer,
  lists
})

export default rootReducer
