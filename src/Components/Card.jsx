import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemTypes from '../itemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import { cardSource, cardTarget} from '../dragndrop-helpers'

class Card extends Component {
  render() {
    const { connectDragSource, dragging, connectDropTarget, text } = this.props;
    const cardClass = dragging ? "card dragging" : "card"

    return connectDragSource(
      connectDropTarget(
        <div className={cardClass}>{text}</div>
      )
    )
  }
}

Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  dragging: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  toggleDrag: PropTypes.func.isRequired,
}

const DropCard = DropTarget(
  ItemTypes.CARD,
  cardTarget,
  (connect) => ({ connectDropTarget: connect.dropTarget() })
)(Card)

export default DragSource(
  ItemTypes.CARD,
  cardSource,
  (connect, monitor) => ({ connectDragSource: connect.dragSource() })
)(DropCard)
