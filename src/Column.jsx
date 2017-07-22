import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import AddCard from './AddCard'


const styles = {
  width: '20vw',
  minWidth: '350px',
  margin: '0 3px 0 3px',
  backgroundColor: 'rgb(226, 228, 230)',
  padding: '35px 20px 20px 20px',
  borderRadius: '10px',
}

export default class Column extends Component {
  render() {
    const { moveCard, columnIdx, cards } = this.props
    return (
      <div style={styles}>
        {cards.map((card, i) => (
            <Card
              idx={i}
              key={card.id}
              text={card.text}
              column={columnIdx}
              toggleDrag={this.props.toggleDrag}
              dragging={card.dragging}
              moveCard={moveCard(columnIdx)}
            />
        ))}
        <AddCard addCard={this.props.addCard} />
      </div>
    )
  }
}

Column.propTypes = {
  cards: PropTypes.array.isRequired,
  moveCard: PropTypes.func.isRequired,
  columnIdx: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired,
}
