import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MdClose from 'react-icons/lib/md/close';

class AddColumnForm extends Component {
  constructor(props) {
    super(props)
    this.state = { opacity: "0", height: '35px' }
  }
  componentDidMount() {
    setTimeout(() => this.setState({opacity: '1',  height: '75px' }),  25)
  }
  componentWillUnmount () {
    this.setState({ opacity: "0", height: '35px' })
  }
  render() {
    const { addColumn, newColumnTitle, handleChange, toggleAddColumn } = this.props;
    return (
      <div style={{
          backgroundColor: 'rgb(226, 228, 230)',
          transition: '.1s height',
          height: this.state.height,
          overflow: 'hidden',
          opacity: this.state.opacity }}>
        <input
          type="text"
          value={newColumnTitle}
          onChange={handleChange}
          placeholder="Add a list..."
          />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <div
            className="button"
            onClick={addColumn.bind(this, newColumnTitle)}
            style={{ marginTop: '7px', marginLeft: '1px', padding: '8px 22px' }}
          >
            Add
          </div>
          <MdClose
            style={{fontSize: '1.45em', cursor: 'pointer', color: 'rgb(136, 136, 136)' }}
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
