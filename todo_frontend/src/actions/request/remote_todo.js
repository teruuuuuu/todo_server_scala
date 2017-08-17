import * as types from '../../constants/response.define'
import createRequestData from './common'

export function  todo_init(groupId) {
  const response_action = function(data){
    return {type: types.INIT_CARD, data: data}
  }

  const data = {
  }

  const reuqestUrl = (groupId == void 0 || groupId == -1 )
                          ? REQUEST_URL.TODO_INIT
                          : REQUEST_URL.GROUP_TODO_INIT.replace("{$1}", groupId);
  return createRequestData( reuqestUrl, 'JSON', 'GET',  data,  response_action);
}

export function  todo_add(categoryId, title, text) {
  const response_action = function(data){
    return {type: types.END, data: data}
  }

  const data = {
    "categoryId": categoryId,
    "title": title,
    "text": text
  }
  const requestUrl = REQUEST_URL.CATEGORY_TODO_ADD.replace("{$1}", categoryId);
  return createRequestData( requestUrl, 'JSON', 'POST',  data,  response_action, true );
}

export function  todo_delete(todoId) {
  const response_action = function(data){
    return {type: types.END, data: data}
  }

  const data = {
    "todoId": todoId,
  }
  const requestUrl = REQUEST_URL.TODO_DELTE.replace("{$1}", todoId);
  return createRequestData( requestUrl, 'json', 'post',  data,  response_action );
}

export function  todo_move(categoryId, todoId) {
  const response_action = function(data){
    return {type: types.END, data: data}
  }

  const data = {
    "categoryId": categoryId,
    "todoId": todoId,
  }
  const requestUrl = REQUEST_URL.TODO_MOVE.replace("{$1}", categoryId);
  return createRequestData( requestUrl, 'json', 'post',  data,  response_action );
}

export function  list_add(groupId, listTitle) {
  const response_action = function(data){
    return {type: types.END, data: data}
  }

  const data = {
    "listTitle": listTitle,
  }
  const requestUrl = REQUEST_URL.LIST_ADD.replace("{$1}", groupId);
  return createRequestData( requestUrl, 'json', 'post',  data,  response_action );
}

export function  list_move(groupId, categoryId, index) {
  const response_action = function(data){
    return {type: types.END, data: data}
  }

  const data = {
    "categoryId": categoryId,
    "index": index,
  }
  const requestUrl = REQUEST_URL.LIST_MOVE.replace("{$1}", groupId);
  return createRequestData( requestUrl, 'json', 'post',  data,  response_action );
}


export function  list_delete(categoryId) {
  const response_action = function(data){
    return {type: types.END, data: data}
  }

  const data = {
    "categoryId": categoryId
  }
  const requestUrl = REQUEST_URL.LIST_DELETE.replace("{$1}", categoryId);
  return createRequestData( requestUrl, 'json', 'DELETE',  data,  response_action );
}
