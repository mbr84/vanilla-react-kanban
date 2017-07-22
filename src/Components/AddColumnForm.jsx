import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MdClose from 'react-icons/lib/md/close';

class AddColumnForm extends Component {
  render() {
    const { addColumn, newColumnTitle, handleChange, toggleAddColumn } = this.props;
    return (
      <div>
        <input
          style={{ width: '100%', fontSize: '1rem', height: '36px', boxSizing: 'border-box' }}
          type="text"
          value={newColumnTitle}
          onChange={handleChange}
          />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            marginTop: '15px',
          }}
        >
          <div
            className="button"
            onClick={addColumn.bind(this, newColumnTitle)}
            style={{ marginTop: '10px' }}
          >
            Add
          </div>
          <MdClose
            style={{fontSize: '1.9em', cursor: 'pointer', color: 'rgb(136, 136, 136)' }}
            onClick={toggleAddColumn}
          />
        </div>

      </div>
    )
  }
}

AddColumnForm.propTypes = {
  addColumn: PropTypes.func.isRequired,
  newColumnTitle: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default AddColumnForm;
