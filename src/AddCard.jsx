import React, {Component} from 'react';
import PropTypes from 'prop-types';

const styles = {
  boxSizing: 'border-box',
  paddingTop: '5%',
  margin: '10px',
  width: '100%',
}
export default class addCard extends Component {
  constructor(props) {
    super(props)

    this.state = { adding: false, newCardText: "" }
    this.toggleAddCard = this.toggleAddCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  toggleAddCard() {
    this.setState({ adding: !this.state.adding })
  }

  handleChange(e) {
    this.setState({newCardText: e.target.value});
  }

  handleSave() {
    this.props.addCard(this.state.newCardText)
    this.setState({ newCardText: "" })
  }


  render() {
    const toggleButtonText = this.state.adding ? "Cancel" : "Add a Card"

    return (
      <div style={styles}>
        {this.state.adding &&
          <div>
            <textarea
              style={{width: '100%'}}
              type="text"
              value={this.state.newCardText}
              onChange={this.handleChange}
              />

          </div>
        }
        <div style={{display: "flex"}}>
          {this.state.adding &&
            <div
              style={{cursor: "pointer"}}
              className="button"
              onClick={this.handleSave}
            >
              Add
            </div>}
          <div style={{cursor: "pointer"}} onClick={this.toggleAddCard}>{toggleButtonText}</div>
        </div>
      </div>
    )
  }
}
