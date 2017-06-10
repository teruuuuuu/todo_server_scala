import React, { Component, PropTypes } from 'react';
import { DropTarget, DragSource } from 'react-dnd';

import Cards from './Cards';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import ListMenu from '../menu/ListMenu'


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
  hover(props, monitor) {
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
      props.moveList(listId, props.x);
    }
  }
};

@DropTarget('list', listTarget, connectDragSource => ({
  connectDropTarget: connectDragSource.dropTarget(),
}))
@DragSource('list', listSource, (connectDragSource, monitor) => ({
  connectDragSource: connectDragSource.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class CardsComponent extends Component {

  constructor(props, context) {
    super(props, context);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
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
    addTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    deleteList: PropTypes.func.isRequired,
  }

  addTodo(data){
    this.props.addTodo(data);
  }

  deleteTodo(data){
    this.props.deleteTodo(data);
  }

  render() {
    const { connectDropTarget, connectDragSource, item, id, x, moveCard, isDragging } = this.props;
    const opacity = isDragging ? 0.5 : 1;

    return connectDragSource(connectDropTarget(
      <div className="desk" style={{ opacity }}>
        <div className="desk-head">
          <div className="desk-name">{item.name}</div>

          <ListMenu id={id} addTodo={this.addTodo} deleteList={this.props.deleteList}/>
        </div>
        <Cards
          moveCard={moveCard}
          x={x}
          cards={item.cards}
          startScrolling={this.props.startScrolling}
          stopScrolling={this.props.stopScrolling}
          isScrolling={this.props.isScrolling}
          deleteTodo={this.deleteTodo}
          componentId={id}
        />

      </div>
    ));
  }
}