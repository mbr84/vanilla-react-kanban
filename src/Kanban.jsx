import React, { Component } from 'react';
import Column from './Column';
import './App.css';

class Kanban extends Component {
  constructor(props) {
    super(props)

    this.addCard = this.addCard.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      nextId: 12,
      columns: [
        [
          { text: "card 0", id: 0 },
          { text: "card 1", id: 1 },
          { text: "card 2", id: 2 },
          { text: "card 3", id: 3 },
        ],
        [
          { text: "card 4", id: 4 },
          { text: "card 5", id: 5 },
          { text: "card 6", id: 6 },
          { text: "card 7", id: 7 },
        ],
        [
          { text: "card 8", id: 8 },
          { text: "card 9", id: 9 },
          { text: "card 10", id: 10 },
          { text: "card 11", id: 11 },
        ],
      ]
    }
  }

  moveCard(column) {
    const _this = this
    return (direction) => {
      return (cardIdx) => {
        return () => {
          const newColumns = _this.state.columns
          const card = newColumns[column][cardIdx]
          newColumns[column].splice(cardIdx, 1)
          newColumns[column + direction % this.state.columns.length].push(card)
          _this.setState({ columns: newColumns })
        }
      }
    }
  }

  addCard(column) {
    return () => {
      const newColumns = this.state.columns
      const newCardText = window.prompt("What should your card say?")
      newColumns[column].push({id: this.state.nextId++,  text: newCardText})
      this.setState({ columns: newColumns })
    }
  }
  render() {
    return (
      <div className="App" style={{display: "flex", justifyContent: "space-around"}}>
        {this.state.columns.map((column, i) => (
          <div key={i} style={{width: "15%"}}>
            <Column
              moveCard={this.moveCard}
              cards={column}
              columnIdx={i}
            />
            <div style={{cursor: "pointer"}} onClick={this.addCard(i)}>+ Add Card</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Kanban;
