import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MdClose from 'react-icons/lib/md/close';

let styles = {
  boxSizing: 'border-box',
  width: '100%',
}
class AddCard extends Component {
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
    const [toggleButtonText, elHeight] = this.state.adding
      ? [<MdClose style={{fontSize: '1.9em'}}/>, '110px' ]
      : ["Add a Card", "35px"]

    styles = Object.assign({}, styles, { height: elHeight})
    return (
      <div style={styles}>
        {this.state.adding &&
          <div>
            <textarea
              type="text"
              value={this.state.newCardText}
              onChange={this.handleChange}
              onKeyPress={(e) => e.key === "Enter" ? (e.preventDefault(), this.handleSave()) : null}
              />

          </div>
        }
        <div style={{
            display: "flex",
            marginTop: '5px',
            position: 'absolute',
            bottom: '10px',
            fontSize: '15px',
          }}>
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

AddCard.propTypes = { addCard: PropTypes.func.isRequired }
export default AddCard
