import React, { Component } from 'react';
import update from 'react/lib/update';
import Column from './Column';
import './App.css';

const styles = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: 'flex-start',
}

class Kanban extends Component {
  constructor(props) {
    super(props)
    const lastState = JSON.parse(localStorage.getItem('lastState'))
    if (lastState) {
      const columns = lastState.columns.map(col =>
        col.map(card => ({
          text: card.text,
          id: card.id,
          dragging: false
        })))
      lastState.columns = columns
    }
    this.addCard = this.addCard.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.toggleDrag = this.toggleDrag.bind(this);
    this.saveBoard = this.saveBoard.bind(this);
    this.state =  lastState ||
      {
        nextId: 12,
        columns: [
          [
            { text: "card 0", id: 0, dragging: false },
            { text: "card 1", id: 1, dragging: false },
            { text: "card 2", id: 2, dragging: false },
            { text: "card 3", id: 3, dragging: false },
          ],
          [
            { text: "card 4", id: 4, dragging: false },
            { text: "card 5", id: 5, dragging: false },
            { text: "card 6", id: 6, dragging: false },
            { text: "card 7", id: 7, dragging: false },
          ],
          [
            { text: "card 8", id: 8, dragging: false },
            { text: "card 9", id: 9, dragging: false },
            { text: "card 10", id: 10, dragging: false },
            { text: "card 11", id: 11, dragging: false },
          ],
          []
        ]
      }
  }

  moveCard(column) {
    const _this = this
      return (dragIdx, hoverIndex, fromColumn) => {
        const columns = _this.state.columns
        fromColumn = fromColumn === undefined ? column : fromColumn
        const card = columns[fromColumn][dragIdx]
        this.setState(update(this.state, {columns: { [fromColumn]: {$splice: [[dragIdx, 1]]}}}))
        this.setState(update(this.state,
          { columns: {[column]: {$splice: [[hoverIndex, 0, card]]} }}))
        this.saveBoard()
    }

  }

  toggleDrag(columnIdx, cardIdx) {
    const currentDragState = this.state.columns[columnIdx][cardIdx].dragging
    this.setState(update(this.state, {columns:
      {[columnIdx]: {[cardIdx]: {dragging: {$set: !currentDragState}}}}}))
  }

  addCard(column) {
    return newCardText => {
      const columns = this.state.columns
      columns[column].push({ id: this.state.nextId++,  text: newCardText, dragging: false })
      this.setState({ columns })
      this.saveBoard()
    }
  }

  saveBoard() {
    setTimeout(() => localStorage.setItem('lastState', JSON.stringify(this.state)), 0)
  }

  render() {
    return (
      <div
        className="App"
        style={styles}>
        {this.state.columns.map((column, i) => (
            <Column
              key={i}
              moveCard={this.moveCard}
              cards={column}
              columnIdx={i}
              addCard={this.addCard(i)}
              toggleDrag={this.toggleDrag}
            />
        ))}
      </div>
    );
  }
}

export default Kanban;
