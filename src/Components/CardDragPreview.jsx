import React, { Component } from 'react';
import PropTypes from 'prop-types';


const styles = {
  transform: 'rotate(-3deg)',
  WebkitTransform: 'rotate(3deg)',
  width: '254px'
};


class CardDragPreview extends Component {
  render() {
    const { text } = this.props;

    return (
      <div style={styles}>
        <div className='card'>{text}</div>
      </div>
    );
  }
}

CardDragPreview.propTypes = {
  title: PropTypes.string,
};

export default CardDragPreview
