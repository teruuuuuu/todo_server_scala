import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DropTarget, DragSource } from 'react-dnd';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import * as CommonFunc from './func/common-func';

import * as ListsActions from '../../actions/todo.action';
import * as RemoteActions from '../../actions/remote';
import * as RemoteService from '../../actions/request/remote_todo'

import TodoCardList from './card/todo-card-list';
import TodoDialog from './dialog/todo-input-dialog';
import ListMenu from './menu/list-menu';


const menuStyle = {
  float: 'right',

};

const iconStyle = {
  color: '#999',
};

const buttonStyle = {
  padding: '0px',
  height: '24px',
  width: '24px'
}

const listSource = {
  beginDrag(props) {
    return {
      id: props.id,
      x: props.x
    };
  },
  endDrag(props) {
    props.stopScrolling();
  }
};

const listTarget = {
  canDrop() {
    return false;
  },
  hover(props, monitor, component) {
    if (!props.isScrolling) {
      if (window.innerWidth - monitor.getClientOffset().x < 200) {
        props.startScrolling('toRight');
      } else if (monitor.getClientOffset().x < 200) {
        props.startScrolling('toLeft');
      }
    } else {
      if (window.innerWidth - monitor.getClientOffset().x > 200 &&
          monitor.getClientOffset().x > 200
      ) {
        props.stopScrolling();
      }
    }
    const { id: listId } = monitor.getItem();
    const { id: nextX } = props;
    if (listId !== nextX) {
      //props.moveList(listId, props.x);
      props.moveList(monitor.getItem().x, props.x);
      props.requestEnque(RemoteService.list_move(props.groupId, monitor.getItem().id, props.id, props.x + 1), CommonFunc.callBack(props.webSocket.webSocket));
      //const nextX = props.x + Math.round( monitor.getClientOffset().x / 200 );
      //props.moveList( props.x, nextX);
    }
  }
};

function mapStateToProps(state) {
  return {
    webSocket: state.todoWebsocket,
    groupId: state.todoReducer.groupId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( Object.assign({}, ListsActions, RemoteActions ), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@DropTarget('list', listTarget, connectDragSource => ({
  connectDropTarget: connectDragSource.dropTarget(),
}))
@DragSource('list', listSource, (connectDragSource, monitor) => ({
  connectDragSource: connectDragSource.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class TodoBoard extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { open: false, selectItem: null };
  }

  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    id: PropTypes.number,
    item: PropTypes.object,
    x: PropTypes.number,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    isDragging: PropTypes.bool,
    startScrolling: PropTypes.func,
    stopScrolling: PropTypes.func,
    isScrolling: PropTypes.bool,
    groupId: PropTypes.number,
  }

  todoEdit(context) {

    function todoEditFunc(item, x, y){
      //context.refs.todoDialog.props.title = item.title;
      //context.refs.todoDialog.props.text = item.text;
      //context.refs.todoDialog.showSet(item);
      context.setState({open: true});
      context.setState({selectItem: item});
    }
    return todoEditFunc;
  }

  clickOk(context) {
    function clickOkFunc(event) {
      //event.props.moveCard();
      const { selectItem } = context.state;
      context.props.requestEnque(RemoteService.todo_update(selectItem.categoryId, selectItem.id, event.title, event.text), CommonFunc.callBack(context.props.webSocket.webSocket));
      context.setState({open: false});
    }
    return clickOkFunc;
  }

  handleRequestClose(context) {
    function handleRequestCloseFunc(){
      context.setState({
        open: false,
      });
    }
    return handleRequestCloseFunc;
  }

  render() {
    const { connectDropTarget, connectDragSource, item, id, x, moveCard, isDragging } = this.props;
    const { open, selectItem } = this.state;
    const opacity = isDragging ? 0.5 : 1;

    return connectDragSource(connectDropTarget(
      <div className="desk" style={{ opacity }}>
        <div className="desk-head">
          <div className="desk-name">{item.name}</div>

          <ListMenu id={id}  />
        </div>
        <TodoCardList
          moveCard={moveCard}
          x={x}
          cards={item.cards}
          startScrolling={this.props.startScrolling}
          stopScrolling={this.props.stopScrolling}
          isScrolling={this.props.isScrolling}
          componentId={id}
          todoEdit={this.todoEdit(this)}
        />
        <TodoDialog menuName="TODO編集" selectItem={selectItem} open={open} handleRequestClose={this.handleRequestClose(this)} clickOk={this.clickOk(this)} ref="todoDialog"/>
      </div>
    ));
  }
}
