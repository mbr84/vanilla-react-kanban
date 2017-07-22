import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MdClose from 'react-icons/lib/md/close';

const styles = {
  boxSizing: 'border-box',
  paddingTop: '5%',
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
    const toggleButtonText = this.state.adding
      ? <MdClose style={{fontSize: '1.9em'}} />
      : "Add a Card"

    return (
      <div style={styles}>
        {this.state.adding &&
          <div>
            <textarea
              style={{ width: '100%', fontSize: '1rem' }}
              type="text"
              value={this.state.newCardText}
              onChange={this.handleChange}
              />

          </div>
        }
        <div style={{ display: "flex", marginTop: '5px' }}>
          {this.state.adding &&
            <div
              className="button"
              onClick={this.handleSave}
            >
              Add
            </div>}
          <div
            style={{cursor: 'pointer', color: 'rgb(136, 136, 136)'}}
            onClick={this.toggleAddCard}
          >
            {toggleButtonText}
          </div>
        </div>
      </div>
    )
  }
}
