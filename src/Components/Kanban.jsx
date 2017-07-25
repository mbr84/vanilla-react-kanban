import React, { Component } from 'react';
import update from 'react/lib/update';
import Column from './Column';
import AddColumn from './AddColumn';

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
    this.deleteColumn = this.deleteColumn.bind(this);
    this.editCard = this.editCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.state = lastState ||
      {
        columns: [
          { title: "To Do", cards: [] },
          { title: "Doing", cards: [{ text: "winning", id: 0, dragging: false }] },
          { title: "Done", cards: [] },
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
      const id = columns.reduce((acc, curr) => acc + curr.cards.length, 0)
      columns[column].cards.push({ id,  text: newCardText, dragging: false })
      this.setState({ columns })
      this.saveBoard()
    }
  }

  editCard(column) {
    return cardIdx => {
      return card => {
        this.setState(update(this.state,
          { columns: { [column]: {cards: {[cardIdx]: { text: {$set: card }}}} }}
        ))
        this.saveBoard()
      }
    }
  }

  deleteCard(column) {
    return (cardIdx) => {
      this.setState(update(this.state,
        { columns: { [column]: { cards: {$splice: [[cardIdx, 1]] } } } }))
      this.saveBoard()
    }
  }

  addColumn() {
    const _this = this
    return function() {
      return title => {
        _this.setState(update(_this.state, {
          columns: {
            $push: [{ title, cards: [] }] }
          }))
        this.setState({ newColumnTitle: "", adding: false })
        _this.saveBoard()
      }
    }
  }

  deleteColumn(column) {
    const columns = this.state.columns
    return () => {
      columns.splice(column, 1)
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
              data={column.data}
              title={column.title}
              cards={column.cards}
              columnIdx={i}
              addCard={this.addCard(i)}
              editCard={this.editCard(i)}
              toggleDrag={this.toggleDrag}
              deleteColumn={this.deleteColumn(i)}
              deleteCard={this.deleteCard(i)}
            />
        ))}
        <AddColumn addColumn={this.addColumn()} />
      </div>
    );
  }
}

export default Kanban;
