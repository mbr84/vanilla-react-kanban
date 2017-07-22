import React, { Component } from 'react';
import Kanban from './Kanban';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import '../App.css';

class App extends Component {
  render() {
    return <Kanban />
  }
}

export default DragDropContext(HTML5Backend)(App);
