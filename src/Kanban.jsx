import React, { Component } from 'react';
import update from 'react/lib/update';
import Column from './Column';
import MdAddCircleOutline from 'react-icons/lib/md/add-circle-outline'
import MdClose from 'react-icons/lib/md/close';
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
    this.toggleAddColumn = this.toggleAddColumn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = lastState ||
      {
        nextId: 12,
        adding: false,
        newColumnText: "",
        columns: [
          {
            title: "To Do",
            data: {},
            cards: [
              { text: "card 0", id: 0, dragging: false },
              { text: "card 1", id: 1, dragging: false },
              { text: "card 2", id: 2, dragging: false },
              { text: "card 3", id: 3, dragging: false },
            ]
          },
          {
            title: "Doing",
            data: {},
            cards: [
              { text: "card 4", id: 4, dragging: false },
              { text: "card 5", id: 5, dragging: false },
              { text: "card 6", id: 6, dragging: false },
              { text: "card 7", id: 7, dragging: false },
            ]
          },
          {
            title: "Done",
            data: {},
            cards: [
              { text: "card 8", id: 8, dragging: false },
              { text: "card 9", id: 9, dragging: false },
              { text: "card 10", id: 10, dragging: false },
              { text: "card 11", id: 11, dragging: false },
            ]
          },
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
    this.setState(update(this.state, { columns: {$push: [{
        title: this.state.newColumnTitle,
        data: {},
        cards: [] }]
      }}))
    this.setState({ newColumnTitle: "", adding: false })
  }

  saveBoard() {
    setTimeout(() => localStorage.setItem('lastState', JSON.stringify(this.state)), 0)
  }

  handleChange(e) {
    this.setState({ newColumnTitle: e.target.value })
  }

  toggleAddColumn() {
    this.setState({ adding: !this.state.adding})
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
        <div className="column" style={{fontSize: '1.2em'}}>
          {!this.state.adding &&
            <div
              onClick={this.toggleAddColumn}
              style={{ cursor: 'pointer'}}
            >
              <MdAddCircleOutline style={{ verticalAlign: 'bottom', fontSize: '1.1em' }}/> New List
            </div>}
          {this.state.adding &&
            <div>
              <input
                style={{ width: '100%', fontSize: '1rem', height: '36px', boxSizing: 'border-box' }}
                type="text"
                value={this.state.newColumnTitle}
                onChange={this.handleChange}
                />
              <div style={{ display: 'flex', justifyContent: 'flexStart', alignItems: 'flexEnd' }}>
                <div
                  className="button"
                  onClick={this.addColumn}
                  style={{ marginTop: '10px' }}
                >
                  Add
                </div>
                <MdClose
                  style={{fontSize: '1.9em', cursor: 'pointer' }}
                  onClick={this.toggleAddColumn}
                />
              </div>

            </div>}
          </div>

      </div>
    );
  }
}

export default Kanban;
