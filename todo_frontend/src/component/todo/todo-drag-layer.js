import React, { Component, PropTypes } from 'react';
import { DragLayer } from 'react-dnd';

import CardDragPreview from './card-drag-preview';
//import snapToGrid from './snapToGrid';


const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100000
};

function snapToGrid(x, y) {
  const snappedX = Math.round(x / 32) * 32;
  const snappedY = Math.round(y / 32) * 32;

  return [snappedX, snappedY];
}


function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  let { x, y } = currentOffset;

  if (props.snapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y;
    [x, y] = snapToGrid(x, y);
    x += initialOffset.x;
    y += initialOffset.y;
  }

  const transform = `translate(${x}px, ${y}px)`;
  return {
    WebkitTransform: transform,
    transform
  };
};

@DragLayer((monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))
export default class TodoDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired,
    snapToGrid: PropTypes.bool.isRequired
  };

  renderItem(type, item) {
    switch (type) {
      case 'card':
        return (
          <CardDragPreview card={item} />
        );
      case 'list':
         return null;
      default:
        return null;
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }


    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}
