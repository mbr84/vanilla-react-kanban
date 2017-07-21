import React, { Component } from 'react';
import ItemTypes from './itemTypes';
import { DragSource } from 'react-dnd';


const cardSource = {
  beginDrag(props) {
    return {props}
  }
}

function collect(connect, moniter) {
  return {
    connectDragSource: connect.dragSource(),
  }
}

class Card extends Component {

  render() {
    const { connectDragSource, text } = this.props;
    return connectDragSource(<div>{text}</div>)
  }
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card)
