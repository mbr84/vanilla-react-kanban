import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemTypes from './itemTypes';
import { DropTarget } from 'react-dnd';
import Card from './Card';


const styles = {
  cardContainer: {
    display: "flex",
    justifyContent: "space-between",
    height: "75px",
    alignItems: 'center'
  },
  arrowButtons: {
    cursor: 'pointer'
  }
}

const columnTarget = {
  drop(props, moniter) {
    const card = moniter.getItem()
    const delta = props.columnIdx - card.props.column
    props.moveCard(card.props.column)(delta)(card.props.idx)()
  }
}

function collect(connect, moniter) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

class Column extends Component {
  render() {
    const { connectDropTarget, moveCard, columnIdx, cards } = this.props
    return connectDropTarget(
      <div>
        {cards.map((card, i) => (
          <div style={styles.cardContainer}>
            <span style={styles.arrowButtons} onClick={moveCard(columnIdx)(-1)(i)}>&lt;</span>
            <Card
              idx={i}
              text={card.text}
              key={i}
              column={columnIdx}
            />
            <span style={styles.arrowButtons} onClick={moveCard(columnIdx)(1)(i)}>&gt;</span>
          </div>
        ))}
      </div>
    )
  }
}

Column.propTypes = {
  cards: PropTypes.array.isRequired,
  moveCard: PropTypes.func.isRequired,
}

export default DropTarget(ItemTypes.CARD, columnTarget, collect)(Column)
