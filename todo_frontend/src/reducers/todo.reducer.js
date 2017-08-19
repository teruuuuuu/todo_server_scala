import { Record } from 'immutable';

import {
  GET_LISTS,
  GET_LISTS_START,
  MOVE_CARD,
  MOVE_LIST,
  TOGGLE_DRAGGING,
  ADD_TODO,
  DELETE_TODO
} from '../constants/action.define';

import {
  INIT_CARD
} from '../constants/response.define'

const InitialState = Record({
  isFetching: false,
  lists: [],
  groupId: -1,
  isDragging: false
});
const initialState = new InitialState;

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LISTS_START:
      return state.set('isFetching', true);
    case GET_LISTS:
      return state.withMutations((ctx) => {
        ctx.set('isFetching', false)
            .set('lists', action.lists);
      });
    case MOVE_CARD: {
      const newLists = [...state.lists];
      const { lastX, lastY, nextX, nextY } = action;
      if (lastX === nextX) {
        newLists[lastX].cards.splice(nextY, 0, newLists[lastX].cards.splice(lastY, 1)[0]);
      } else {
        // move element to new place
        newLists[nextX].cards.splice(nextY, 0, newLists[lastX].cards[lastY]);
        // delete element from old place
        newLists[lastX].cards.splice(lastY, 1);
      }
      return Object.assign({}, state, { lists: newLists});

    }
    case MOVE_LIST: {
      const newLists = [...state.lists];
      //const { lastX, nextX } = action;
      const t = newLists.splice(action.lastX, 1)[0];
      newLists.splice(action.nextX, 0, t);
      return Object.assign({}, state, { lists: newLists});
    }
    case TOGGLE_DRAGGING: {
      //return state.set('isDragging', action.isDragging);
      return Object.assign({}, state, { isDragging: action.isDragging})
    }
    case INIT_CARD: {
      return Object.assign({}, state, { lists: action.data.todoViews, groupId: action.data.groupId})
    }
    case ADD_TODO: {
      const newLists = [...state.lists];
      var x = 0;
      var max = 0;
      for(var i=0; i < newLists.length; i++){
        if(newLists[i].id == action.data.componentId){
          x = i;
        }
        for(var j=0; j < newLists[i].cards.length; j++){
          if(newLists[i].cards[j].id >= max){
            max = newLists[i].cards[j].id + 1;
          }
        }
      }
      const newTodo = {
        'id': max,
        'title': action.data.title,
        'text': action.data.text
      }
      newLists[x].cards.push(newTodo)
      return Object.assign({}, state, { lists: newLists})
    }
    case DELETE_TODO: {
      const newLists = [...state.lists];
      newLists[action.data.x].cards.splice(action.data.y, 1);
      return Object.assign({}, state, { lists: newLists});
    }
    default:
      return state;
  }
}
