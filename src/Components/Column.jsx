import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemTypes from '../itemTypes';
import Card from './Card';
import AddCard from './AddCard';
import { DropTarget } from 'react-dnd';
import { collect, columnTarget } from '../dragndrop-helpers'


class Column extends Component {
  render() {
    const { moveCard, columnIdx, cards, connectDropTarget, title } = this.props
    return (
      <div className="column">
        <div style={{ marginBottom: '10px', fontWeight: '800', textAlign: 'start' }}>{title}</div>
        {connectDropTarget(
          <div style={{minHeight: "50px"}}>
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
          </div>)}
        <AddCard addCard={this.props.addCard} />
      </div>
    )
  }
}

Column.propTypes = {
  cards: PropTypes.array.isRequired,
  moveCard: PropTypes.func.isRequired,
  columnIdx: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
}

export default DropTarget(ItemTypes.CARD, columnTarget, collect)(Column)
