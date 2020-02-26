import React from 'react';
import './CardContainer.scss';
import { connect } from 'react-redux';

export const CardContainer = (props) => {
  return null
}

const mapStateToProps = state => ({
  cards: state.cards
})

export default connect(mapStateToProps)(CardContainer)
