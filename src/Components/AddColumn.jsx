import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MdAddCircleOutline from 'react-icons/lib/md/add-circle-outline'
import AddColumnForm from './AddColumnForm';

class AddColumn extends Component {
  constructor(props) {
    super(props)

    this.toggleAddColumn = this.toggleAddColumn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { adding: false, newColumnTitle: "" }
  }

  handleChange(e) {
      this.setState({ newColumnTitle: e.target.value })
  }

  toggleAddColumn() {
    this.setState({ adding: !this.state.adding})
  }

  render() {
    const { addColumn } = this.props;
    return (
      <div className="column" style={{
          fontSize: '1.2em',
          padding: '5px',
          minHeight: '0',
          background: this.state.adding ? '#E2E4E6' : 'rgba(0,0,0,.12)',
         }}>
        {
          !this.state.adding
          ?
            <div
              className="add-column-prompt"
              onClick={this.toggleAddColumn}
              style={{ cursor: 'pointer'}}
            >
              Add a list...
            </div>
          :
            <AddColumnForm
              newColumnTitle={this.state.newColumnTitle}
              handleChange={this.handleChange.bind(this)}
              addColumn={addColumn.bind(this)()}
              toggleAddColumn={this.toggleAddColumn.bind(this)}
            />
        }

      </div>
    )
  }
}

AddColumn.propTypes = {
  addColumn: PropTypes.func.isRequired,
}

export default AddColumn
