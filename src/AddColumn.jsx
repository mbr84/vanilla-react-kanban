import React, { Component } from 'react';
import MdAddCircleOutline from 'react-icons/lib/md/add-circle-outline'
import AddColumnForm from './AddColumnForm';

export default class addColumn extends Component {
  constructor(props) {
    super(props)

    this.toggleAddColumn = this.toggleAddColumn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { adding: false, newColumnTitle: "" }
  }

  handleChange() {
    const _this = this
    return function(e) {
      _this.setState({ newColumnTitle: e.target.value })
    }
  }

  toggleAddColumn() {
    this.setState({ adding: !this.state.adding})
  }

  render() {
    const { addColumn } = this.props;
    return (
      <div className="column" style={{fontSize: '1.2em'}}>
        {
          !this.state.adding
            ?
              <div
                onClick={this.toggleAddColumn}
                style={{ cursor: 'pointer'}}
              >
                <MdAddCircleOutline style={{ verticalAlign: 'bottom', fontSize: '1.1em' }}/> New List
              </div>
            :
              <AddColumnForm
                newColumnTitle={this.state.newColumnTitle}
                handleChange={this.handleChange()}
                addColumn={addColumn.bind(this)()}
                toggleAddColumn={this.toggleAddColumn.bind(this)}
              />
        }

      </div>
    )
  }
}
