import faker from 'faker';

import {
  GET_LISTS,
  GET_LISTS_START,
  MOVE_CARD,
  MOVE_LIST,
  TOGGLE_DRAGGING,
  ADD_TODO,
  DELETE_TODO
} from '../constants/action.define';

export function getLists(quantity) {
  return dispatch => {
    dispatch({ type: GET_LISTS_START, quantity });
    setTimeout(() => {
      const lists = [];
      let count = 0;
      for (let i = 0; i < quantity; i++) {
        const cards = [];
        const randomQuantity = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
        for (let ic = 0; ic < randomQuantity; ic++) {
          cards.push({
            id: count,
            //firstName: faker.name.firstName(),
            firstName: "first name",
            //lastName: faker.name.lastName(),
            lastName: "last name",
            //title: faker.name.jobTitle()
            title: "job title"
          });
          count = count + 1;
        }
        lists.push({
          id: i,
          //name: faker.commerce.productName(),
          name: "product name",
          cards
        });
      }
      dispatch({ type: GET_LISTS, lists, isFetching: true });
    }, 1000); // fake delay
    dispatch({ type: GET_LISTS_START, isFetching: false });
  };
}

export function moveList(lastX, nextX) {
  return (dispatch) => {
    dispatch({ type: MOVE_LIST, lastX, nextX });
  };
}

export function moveCard(lastX, lastY, nextX, nextY) {
  return (dispatch) => {
    dispatch({ type: MOVE_CARD, lastX, lastY, nextX, nextY });
  };
}

export function toggleDragging(isDragging) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_DRAGGING, isDragging });
  };
}

export function addTodo(data) {
  return (dispatch) => {
    dispatch({ type: ADD_TODO, data });
  };
}

export function deleteTodo(data) {
  return (dispatch) => {
    dispatch({ type: DELETE_TODO, data });
  };
}
