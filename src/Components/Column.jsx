import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemTypes from '../itemTypes';
import Card from './Card';
import AddCard from './AddCard';
import { DropTarget } from 'react-dnd';
import { collect, columnTarget } from '../dragndrop-helpers'


class Column extends Component {
  render() {
    const { moveCard, columnIdx, cards, isOver, canDrop, connectDropTarget, title } = this.props
    return (
      <div className="column">
        <div style={{ padding: '8px 10px 8px 10px' }}>
          <div style={{
              fontWeight: '800',
              textAlign: 'start',
              fontSize: '.9em'
            }}>
              {title}
          </div>
        </div>
        {connectDropTarget(
          <div style={{ minHeight: "60px", padding: '0 4px 0 4px', margin: '0 4px 0 4px' }}>
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
            {isOver && canDrop && <div className="card dragging"></div>}
            <AddCard addCard={this.props.addCard} />
          </div>)}
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
