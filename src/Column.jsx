import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import AddCard from './AddCard'


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
    props.moveCard(card.props.column)(delta)(card.props.idx)
  }
}

function collect(connect, moniter) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

export default class Column extends Component {

  render() {
    const { moveCard, columnIdx, cards } = this.props
    return (
      <div style={{width: this.props.width, margin: "0 3px 0 3px"}}>
        {cards.map((card, i) => (
          // <div key={card.id} style={styles.cardContainer}>
          //   <span
          //     style={styles.arrowButtons}
          //     onClick={moveCard(columnIdx)(-1).bind(undefined, i)}
          //   >
          //     &lt;
          //   </span>
            <Card
              idx={i}
              key={card.id}
              id={card.id}
              text={card.text}
              column={columnIdx}
              toggleDrag={this.props.toggleDrag}
              dragging={card.dragging}
              moveCard={moveCard(columnIdx)}
            />
          //   <span
          //     style={styles.arrowButtons}
          //     onClick={moveCard(columnIdx)(1).bind(undefined, i)}
          //   >
          //     &gt;
          //   </span>
          // </div>
        ))}
        <AddCard addCard={this.props.addCard} />
      </div>
    )
  }
}

Column.propTypes = {
  cards: PropTypes.array.isRequired,
  moveCard: PropTypes.func.isRequired,
}

// export default DropTarget(ItemTypes.CARD, columnTarget, collect)(Column)
