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
  constructor(props) {
    super(props)

    this.state = { adding: false, newCardText: "" }
    this.toggleAddCard = this.toggleAddCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  toggleAddCard() {
    this.setState({ adding: !this.state.adding })
  }

  handleChange(e) {
    this.setState({newCardText: e.target.value});
  }

  handleSave() {
    this.props.addCard(this.state.newCardText)
    this.toggleAddCard()
    this.setState({ newCardText: "" })
  }


  render() {
    const { connectDropTarget, moveCard, columnIdx, cards } = this.props
    const toggleButtonText = this.state.adding ? "Cancel" : "Add Card"
    return connectDropTarget(
      <div>
        {cards.map((card, i) => (
          <div key={i} style={styles.cardContainer}>
            <span style={styles.arrowButtons} onClick={moveCard(columnIdx)(-1)(i)}>&lt;</span>
            <Card
              idx={i}
              text={card.text}
              column={columnIdx}
            />
            <span style={styles.arrowButtons} onClick={moveCard(columnIdx)(1)(i)}>&gt;</span>
          </div>
        ))}
        {this.state.adding &&
          <div>
            <input
              type="text"
              value={this.state.newCardText}
              onChange={this.handleChange}
            />
          <button onClick={this.handleSave}>Save</button>
          </div>
        }
        <div style={{cursor: "pointer"}} onClick={this.toggleAddCard}>{toggleButtonText}</div>
      </div>
    )
  }
}

Column.propTypes = {
  cards: PropTypes.array.isRequired,
  moveCard: PropTypes.func.isRequired,
}

export default DropTarget(ItemTypes.CARD, columnTarget, collect)(Column)
