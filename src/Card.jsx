import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemTypes from './itemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import { cardSource, cardTarget} from './dnd-config'

const styles = {
  height: "50px",
  backgroundColor: 'white',
  color: 'rgb(77, 77, 77)',
  fontSize: '18px',
  fontWeight: '600',
  opacity: '1',
  width: '100%',
  boxSizing: 'border-box',
  padding: '4%',
  borderRadius: '5px',
  marginBottom: '10px',
  transition: ".2s all",
  textAlign: "start",
}

class Card extends Component {
  render() {
    const { connectDragSource, dragging, connectDropTarget, text } = this.props;
    const dragStyles = dragging ? {
      backgroundColor: "rgb(196, 196, 194)",
      color: "rgb(196, 196, 194)",
    } : {}

    return connectDragSource(
      connectDropTarget(
        <div style={Object.assign({}, styles, dragStyles)}>{text}</div>
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

export default DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
}))(DropCard)
