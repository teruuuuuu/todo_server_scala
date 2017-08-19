import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import * as ListsActions from '../../actions/todo.action';
import * as RemoteActions from '../../actions/remote';
import * as RemoteService from '../../actions/request/remote_todo'
import * as TestActions from '../../actions/test_actions';


import TodoBoard from './todo-board';
import TodoDragLayer from './todo-drag-layer';
import TodoListAdd from './todo-add';
import TodoWebSocket from './todo-websocket';


function mapStateToProps(state) {
  return {
    lists: state.todoReducer.lists,
    groupId: state.todoReducer.groupId,
    loginUser: state.loginUser,
    webSocket: state.todoWebsocket
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( Object.assign({}, ListsActions, RemoteActions ), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@DragDropContext(HTML5Backend)
export default class TodoComponent extends Component {

  static propTypes = {
    getLists: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    callApi: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
    groupId: PropTypes.number.isRequired,
    loginUser: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.moveList = this.moveList.bind(this);
    this.findList = this.findList.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.stopScrolling = this.stopScrolling.bind(this);
    this.startScrolling = this.startScrolling.bind(this);
    this.addList = this.addList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.onMessageFunc = this.onMessageFunc.bind(this);
    this.state = { isScrolling: false};
  }

  initTodoList() {
    return this.props.requestEnque(RemoteService.todo_init(this.props.groupId));
  }

  componentWillMount() {
    this.props.requestEnque(RemoteService.todo_init(this.props.groupId));
  }

  componentWillReceiveProps(nextProps) {
  }


  startScrolling(direction) {
    // if (!this.state.isScrolling) {
    switch (direction) {
      case 'toLeft':
        this.setState({ isScrolling: true }, this.scrollLeft());
        break;
      case 'toRight':
        this.setState({ isScrolling: true }, this.scrollRight());
        break;
      default:
        break;
    }
  }

  scrollRight() {
    function scroll() {
      document.getElementsByTagName('main')[0].scrollLeft += 10;
    }
    this.scrollInterval = setInterval(scroll, 10);
  }

  scrollLeft() {
    function scroll() {
      document.getElementsByTagName('main')[0].scrollLeft -= 10;
    }
    this.scrollInterval = setInterval(scroll, 10);
  }

  stopScrolling() {
    this.setState({ isScrolling: false }, clearInterval(this.scrollInterval));
  }

  moveCard(lastX, lastY, nextX, nextY, categoryId, todoId) {
    this.props.moveCard(lastX, lastY, nextX, nextY);
    //this.props.callApi(RemoteService.todo_move(categoryId, todoId));
    this.props.requestEnque(RemoteService.todo_move(categoryId, todoId), this.callBack(this.props.webSocket.webSocket));
  }

  moveList(listId, nextX) {
    const { lastX } = this.findList(listId);
    this.props.moveList(lastX, nextX);
    //this.props.callApi(RemoteService.list_move(listId, nextX + 1));
    this.props.requestEnque(RemoteService.list_move(this.props.groupId, listId, nextX + 1), this.callBack(this.props.webSocket.webSocket));
  }

  findList(id) {
    const { lists } = this.props;
    const list = lists.filter(l => l.id === id)[0];

    return {
      list,
      lastX: lists.indexOf(list)
    };
  }

  addList(listTitle){
    this.props.requestEnque(RemoteService.list_add(this.props.groupId, listTitle), this.callBack(this.props.webSocket.webSocket));
  }

  deleteList(listId){
    this.props.requestEnque(RemoteService.list_delete(this.props.groupId, listId), this.callBack(this.props.webSocket.webSocket));
  }

  addTodo(data){
    this.props.requestEnque(RemoteService.todo_add( data.componentId, data.title, data.text), this.callBack(this.props.webSocket.webSocket));
  }

  onMessageFunc() {
    this.props.requestEnque(RemoteService.todo_init(this.props.groupId));
  }

  callBack(webSocket) {
    function method(){
      webSocket.send("update")
    }
    return method;
  }

  render() {
    const { lists } = this.props;

    return (
      <div className="board-wrapper">
        <div className="board" style={{ height: '100%' }}>
          <TodoDragLayer snapToGrid={false} />
          {lists.map((item, i) =>
            <TodoBoard
              key={item.id}
              id={item.id}
              item={item}
              moveCard={this.moveCard}
              moveList={this.moveList}
              startScrolling={this.startScrolling}
              stopScrolling={this.stopScrolling}
              isScrolling={this.state.isScrolling}
              x={i}
              addTodo={this.addTodo}
              deleteList={this.deleteList}
            />
          )}
          <TodoListAdd
            addList={this.addList}
          />
        </div>
        <TodoWebSocket ref="webSocket"
          onMessageFunc={this.onMessageFunc}
          callBackFunc={this.callBackFunc}/>
      </div>

    );
  }
}
