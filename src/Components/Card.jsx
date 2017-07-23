import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemTypes from '../itemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import { cardSource, cardTarget} from '../dragndrop-helpers'
import { getEmptyImage } from 'react-dnd-html5-backend';

class Card extends Component {

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  render() {
    const { connectDragSource, dragging, connectDropTarget, isDragging, text } = this.props;
    const cardClass = dragging ? "card dragging" : "card"
    const value = isDragging ? 0 : 1
    const styles = { opacity: value, height: value }

    return connectDragSource(
      connectDropTarget(
        <div className={cardClass} style={styles}>{text}</div>
      )
    )
  }
}

Card.propTypes = {
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
  dragging: PropTypes.bool,
  text: PropTypes.string.isRequired,
  toggleDrag: PropTypes.func,
}

const DropCard = DropTarget(
  ItemTypes.CARD,
  cardTarget,
  (connect) => ({ connectDropTarget: connect.dropTarget() })
)(Card)

export default DragSource(
  ItemTypes.CARD,
  cardSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
)(DropCard)
