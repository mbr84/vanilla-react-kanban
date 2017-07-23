import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card'


const styles = {
  display: 'inline-block',
  transform: 'rotate(3deg)',
  WebkitTransform: 'rotate(3deg)',
  width: '254px'
};


class CardDragPreview extends Component {
  render() {
    const { text } = this.props;

    return (
      <div style={styles}>
        <Card text={text} />
      </div>
    );
  }
}

CardDragPreview.propTypes = {
  title: PropTypes.string,
};

export default CardDragPreview
