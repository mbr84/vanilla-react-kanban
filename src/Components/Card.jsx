import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemTypes from '../itemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import { cardSource, cardTarget} from '../dragndrop-helpers'
import { getEmptyImage } from 'react-dnd-html5-backend';
import MdEdit from 'react-icons/lib/md/edit'
import FaClose from 'react-icons/lib/fa/close'
import FaCheck from 'react-icons/lib/fa/check'
import MdDelete from 'react-icons/lib/md/delete'

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = { editing: false, editCardText: props.text }
    this.toggleEditor = this.toggleEditor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleEditor() {
    this.setState({ editing: !this.state.editing })
  }
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  handleChange(e) {
    this.setState({editCardText: e.target.value});
  }

  handleSave(){
    this.props.editCard(this.state.editCardText)
    this.toggleEditor()
  }

  handleDelete() {
    const { deleteCard, idx } = this.props;
    deleteCard(idx)
  }

  render() {
    const { connectDragSource, dragging, connectDropTarget, isDragging, text } = this.props;
    const cardClass = dragging ? "card dragging" : "card"
    const value = isDragging ? 0 : 1
    const styles = { opacity: value }

    const renderComponent = this.state.editing
      ?
        <span style={{position: 'relative'}}>
          <textarea
            type="text"
            value={this.state.editCardText}
            onChange={this.handleChange}
            onKeyPress={(e) => e.key === "Enter" ? (e.preventDefault(), this.handleSave()) : null}
          >
            {text}
          </textarea>
          <div className="edit-buttons">
            <FaClose className='close-edit-card' onClick={this.toggleEditor}/>
            <FaCheck className='done-edit-card' onClick={this.handleSave}/>
          </div>
        </span>
      :
        <div className={cardClass} style={styles}>
          {text}
          <div className="edit-delete">
            <MdEdit className='edit-card' onClick={this.toggleEditor}/>
            <MdDelete className='delete-card' onClick={this.handleDelete}/>
          </div>
        </div>

    return connectDragSource(connectDropTarget(renderComponent))
  }
}

Card.propTypes = {
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
  dragging: PropTypes.bool,
  text: PropTypes.string.isRequired,
  toggleDrag: PropTypes.func,
}

const DropCard = DropTarget(
  ItemTypes.CARD,
  cardTarget,
  (connect) => ({ connectDropTarget: connect.dropTarget() })
)(Card)

export default DragSource(
  ItemTypes.CARD,
  cardSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
)(DropCard)
