import React, { Component } from 'react';
import update from 'react/lib/update';
import Column from './Column';
import './App.css';

class Kanban extends Component {
  constructor(props) {
    super(props)

    this.addCard = this.addCard.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.toggleDrag = this.toggleDrag.bind(this);
    this.state = {
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
      ]
    }
  }

  moveCard(column) {
    const _this = this
    return direction => {
      return (dragIdx, hoverIndex, fromColumn) => {
          const columns = _this.state.columns
          fromColumn = fromColumn === undefined ? column : fromColumn
          const card = columns[fromColumn][dragIdx]
          // columns[fromColumn].splice(dragIdx, 1)
          // columns[(column + direction + columns.length) % columns.length].splice(hoverIndex, 0, card)
          console.log(fromColumn, column)
          this.setState(update(this.state, {columns: { [fromColumn]: {$splice: [[dragIdx, 1]]}}}))
          this.setState(update(this.state,
            { columns: {[column]: {$splice: [[hoverIndex, 0, card]]} }}))
      }
    }
  }

  toggleDrag(columnIdx, cardIdx) {
    console.log(this.state.columns[columnIdx][cardIdx].dragging)
    this.setState(update(this.state, {columns: {[columnIdx]: {[cardIdx]: {dragging: {$set: !this.state.columns[columnIdx][cardIdx].dragging}}}}}))
  }

  addCard(column) {
    const _this = this
    return (newCardText) => {
      const newColumns = _this.state.columns
      newColumns[column].push({id: _this.state.nextId++,  text: newCardText})
      _this.setState({ columns: newColumns })
    }
  }
  render() {
    return (
      <div className="App" style={{display: "flex", justifyContent: "space-around"}}>
        {this.state.columns.map((column, i) => (
            <Column
              moveCard={this.moveCard}
              cards={column}
              width={(1 / this.state.columns.length * 100 - 2) + "%"}
              columnIdx={i}
              key={i}
              addCard={this.addCard(i)}
              toggleDrag={this.toggleDrag}
            />
        ))}
      </div>
    );
  }
}

export default Kanban;
