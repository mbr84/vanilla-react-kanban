import { findDOMNode } from 'react-dom';

export const cardSource = {
  beginDrag(props) {
    props.toggleDrag(props.column, props.idx)
    return {
      idx: props.idx,
      column: props.column,
    }
  },

  endDrag(props, monitor) {
    const { column, idx } = monitor.getItem()
    props.toggleDrag(column, idx)
  }
}

export const cardTarget = {
  hover(props, monitor, component) {
    const card = monitor.getItem()
    const dragIndex = card.idx;
    const hoverIndex = props.idx;

    if (dragIndex === hoverIndex && props.column === card.column) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY - 9) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY + 9) {
      return;
    }

    const delta = props.column - card.column
    props.moveCard(dragIndex, hoverIndex, card.column);

    monitor.getItem().idx = hoverIndex;
    monitor.getItem().column = props.column;
  },
};
