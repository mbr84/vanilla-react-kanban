import React, { Component } from 'react';
import ItemTypes from './itemTypes';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';


const cardSource = {
  beginDrag(props) {
    props.toggleDrag(props.column, props.idx)
    return {
      idx: props.idx,
      column: props.column,
      id: props.id,
    }
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const card = monitor.getItem()
    const dragIndex = card.idx;
    const hoverIndex = props.idx;
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY - 10) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY + 10) {
      return;
    }

    // Time to actually perform the action
    const delta = props.column - card.column
    props.moveCard(delta)(dragIndex, hoverIndex, card.column);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().idx = hoverIndex;
    monitor.getItem().column = props.column;
  },
  drop(props, monitor) {
    const { column, idx } = monitor.getItem()
    props.toggleDrag(column, idx)
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    // isDragging: monitor.isDragging(),
  }
}


class Card extends Component {
  render() {
    const styles = {
      height: "75px",
      backgroundColor: 'cornflowerblue',
      color: 'white',
      fontSize: '24px',
      fontWeight: '600',
      opacity: '1',
      width: '100%',
      boxSizing: 'border-box',
      paddingTop: '5%',
      margin: '10px'
    }
    const { connectDragSource, dragging, connectDropTarget, text } = this.props;
    if (dragging) {
      styles.backgroundColor = "gray"
      styles.color = "gray"
      styles.transition = ".25s all"
    }
    console.log(dragging, text)
    return connectDragSource(connectDropTarget(<div style={styles}>{text}</div>))
  }
}

const DropCard = DropTarget(
  ItemTypes.CARD,
  cardTarget,
  (connect) => ({ connectDropTarget: connect.dropTarget() })
)(Card)
export default DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
}))(DropCard)
