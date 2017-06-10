import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import * as ListsActions from '../actions/lists';
import * as RemoteActions from '../actions/remote';
import * as RemoteService from '../remote/remote_todo'
import * as TestActions from '../actions/test_actions';


import CardsComponent from '../component/board/card/CardsComponent';
import CustomDragLayer from '../component/board/CustomDragLayer';
import TodoListAdd from '../component/board/card/TodoListAdd';


function mapStateToProps(state) {
  return {
    lists: state.lists.lists
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( Object.assign({}, ListsActions, RemoteActions ), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@DragDropContext(HTML5Backend)
export default class Board extends Component {
  
  static propTypes = {
    getLists: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    callApi: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
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
    this.deleteTodo = this.deleteTodo.bind(this);
    this.state = { isScrolling: false };
  }

  componentWillMount() {
    //this.props.getLists(4);
    this.props.callApi(RemoteService.todo_init());
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
    // }
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
    this.props.callApi(RemoteService.todo_move(categoryId, todoId));
  }

  moveList(listId, nextX) {
    const { lastX } = this.findList(listId);
    this.props.moveList(lastX, nextX);
    this.props.callApi(RemoteService.list_move(listId, nextX + 1));
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
    this.props.callApi(RemoteService.list_add(listTitle));
  }

  deleteList(listId){
    this.props.callApi(RemoteService.list_delete(listId));
  }

  addTodo(data){
    //this.props.addTodo(data);
    this.props.callApi(RemoteService.todo_add(data.componentId, data.title, data.text));
  }

  deleteTodo(data){
    //this.props.deleteTodo(data)
    this.props.callApi(RemoteService.todo_delete(data.id));
  }

  render() {
    const { lists } = this.props;

    return (
      <div className="board-wrapper">
        <div className="board" style={{ height: '100%' }}>
          <CustomDragLayer snapToGrid={false} />
          {lists.map((item, i) =>
            <CardsComponent
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
              deleteTodo={this.deleteTodo}
              deleteList={this.deleteList}
            />
          )}
          <TodoListAdd
            addList={this.addList}
          />
        </div>
      </div>

    );
  }
}
