import React, { Component } from 'react';
import update from 'react/lib/update';
import Column from './Column';
import AddColumn from './AddColumn';
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

    this.addCard = this.addCard.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.toggleDrag = this.toggleDrag.bind(this);
    this.saveBoard = this.saveBoard.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.state = lastState ||
      {
        nextId: 0,
        columns: [
          { title: "To Do", data: {}, cards: [] },
          { title: "Doing", data: {}, cards: [] },
          { title: "Done", data: {}, cards: [] },
        ]
      }
  }

  moveCard(column) {
      return (dragIdx, hoverIdx, fromColumn) => {
        const columns = this.state.columns
        const card = columns[fromColumn].cards[dragIdx]
        this.setState(update(this.state, {
          columns: {[fromColumn]: {cards: {$splice: [[dragIdx, 1]]}}}}))
        this.setState(update(this.state, {
          columns: { [column]: {cards: {$splice: [[hoverIdx, 0, card]]}}}}))
    }

  }

  toggleDrag(columnIdx, cardIdx) {
    const currentDragState = this.state.columns[columnIdx].cards[cardIdx].dragging
    this.setState(update(this.state, {columns:
      {[columnIdx]: {cards: {[cardIdx]: {dragging: {$set: !currentDragState}}}}}}))
    this.saveBoard()
  }

  addCard(column) {
    return newCardText => {
      const columns = this.state.columns
      columns[column].cards.push({ id: this.state.nextId++,  text: newCardText, dragging: false })
      this.setState({ columns })
      this.saveBoard()
    }
  }

  addColumn() {
    const _this = this
    return function() {
      return title => {
        _this.setState(update(_this.state, { columns: {
          $push: [{ title: title, data: {}, cards: [] }] } }))
        this.setState({ newColumnTitle: "", adding: false })
        _this.saveBoard()
      }
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
              data={column.data}
              title={column.title}
              cards={column.cards}
              columnIdx={i}
              addCard={this.addCard(i)}
              toggleDrag={this.toggleDrag}
            />
        ))}
        <AddColumn addColumn={this.addColumn()} />
      </div>
    );
  }
}

export default Kanban;
