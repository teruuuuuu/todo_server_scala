import * as types from '../constants/ToDoResponseTypes'

function createRequestData(url, dataType, type, data, response_action, isJsonRequest){
  if (isJsonRequest == null | isJsonRequest == false) {
    return { url: url,
             dataType:dataType,
             type:type,
             data: data,
             response_action: response_action,
             contentType: 'application/x-www-form-urlencoded; charset=UTF-8' }
  }else{
    return { url: url,
             dataType:dataType,
             type:type,
             data:  data,
             response_action: response_action,
             contentType: 'application/x-www-form-urlencoded; charset=UTF-8' }
  }

}

export function  todo_init() {
  const response_action = function(data){
    return {type: types.INIT_CARD, data: data}
  }

  const data = {
  }
  return createRequestData( REQUEST_URL.TODO_INIT, 'JSON', 'GET',  null,  response_action);
}

export function  todo_add(categoryId, title, text) {
  const response_action = function(data){
    return {type: types.INIT_CARD, data: data}
  }

  const data = {
    "categoryId": categoryId,
    "title": title,
    "text": text
  }
  return createRequestData( REQUEST_URL.TODO_ADD, 'JSON', 'POST',  data,  response_action, true );
}

export function  todo_delete(todoId) {
  const response_action = function(data){
    return {type: types.INIT_CARD, data: data}
  }

  const data = {
    "todoId": todoId,
  }
  return createRequestData( REQUEST_URL.TODO_DELTE, 'json', 'post',  data,  response_action );
}

export function  todo_move(categoryId, todoId) {
  const response_action = function(data){
    return {type: types.BLANK, data: data}
  }

  const data = {
    "categoryId": categoryId,
    "todoId": todoId,
  }
  return createRequestData( REQUEST_URL.TODO_MOVE, 'json', 'post',  data,  response_action );
}

export function  list_add(listTitle) {
  const response_action = function(data){
    return {type: types.INIT_CARD, data: data}
  }

  const data = {
    "listTitle": listTitle,
  }

  return createRequestData( REQUEST_URL.LIST_ADD, 'json', 'post',  data,  response_action );
}

export function  list_move(categoryId, index) {
  const response_action = function(data){
    return {type: types.BLANK, data: data}
  }

  const data = {
    "categoryId": categoryId,
    "index": index,
  }

  return createRequestData( REQUEST_URL.LIST_MOVE, 'json', 'post',  data,  response_action );
}


export function  list_delete(categoryId) {
  const response_action = function(data){
    return {type: types.INIT_CARD, data: data}
  }

  const data = {
    "categoryId": categoryId
  }

  return createRequestData( REQUEST_URL.LIST_DELETE, 'json', 'post',  data,  response_action );
}