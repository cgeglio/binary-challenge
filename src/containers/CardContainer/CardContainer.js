import React, { Component } from 'react';
import './CardContainer.scss';
import { connect } from 'react-redux';
import { getCards, getFortune } from '../../apiCalls'
import { addCards, addFortune } from '../../actions'
import Card from '../../components/Card/Card'
import Loader from '../../components/Loader/Loader'

class CardContainer extends Component {

  componentDidMount() {
    let fortuneIndex = Math.floor(Math.random() * 100);
    getCards()
      .then(cards=> this.props.addCardsToStore(cards.cards))
      .catch(error => console.log(error))

    getFortune()
      .then(fortunes => this.props.addFortuneToStore(fortunes[fortuneIndex].message))
      .catch(error => console.log(error))
  }

  render() {
    return (
      !this.props.cards.length ? <Loader /> :
        <section className='card-container'>
          <h2 className='question'>{this.props.question}</h2>
          <section className='cards'>
            {this.props.cards.map(card => {
              return <Card key={card.name_short} card={card} />
            })}
          </section>
          <h2>{this.props.fortune}</h2>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  cards: state.cards,
  question: state.question,
  fortune: state.fortune
})

const mapDispatchToProps = dispatch => ({
  addCardsToStore: cards => (dispatch(addCards(cards))),
  addFortuneToStore: fortune => (dispatch(addFortune(fortune)))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)
