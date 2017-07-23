import React, { Component } from 'react';
import Kanban from './Kanban';
import CustomDragLayer from './CustomDragLayer';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Kanban />
        <CustomDragLayer />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App);
