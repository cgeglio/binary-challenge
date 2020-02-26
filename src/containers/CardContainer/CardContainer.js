import React, { Component } from 'react';
import './CardContainer.scss';
import { connect } from 'react-redux';
import { getCards } from '../../apiCalls'
import { addCards } from '../../actions'
import Card from '../../components/Card/Card'
import Loader from '../../components/Loader/Loader'

class CardContainer extends Component {

  componentDidMount() {
    getCards()
      .then(cards=> this.props.addCardsToStore(cards.cards))
      .catch(error => console.log(error))
  }

  render() {
    return (
      !this.props.cards.length ? <Loader /> :
      this.props.cards.map(card => {
        return <Card key={card.name_short} card={card} />
      })
    )
  }
}

const mapStateToProps = state => ({
  cards: state.cards
})

const mapDispatchToProps = dispatch => ({
  addCardsToStore: cards => (dispatch(addCards(cards)))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)
