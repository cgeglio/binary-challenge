import React, { Component } from 'react';
import './CardContainer.scss';
import { connect } from 'react-redux';
import { getCards, getFortune } from '../../apiCalls';
import { addFavorite, removeFavorite, addCards, addFortune, addReading, removeCards, removeQuestion } from '../../actions';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import save from '../../images/save.png';
import saved from '../../images/saved.png';
import PropTypes from 'prop-types';

export class CardContainer extends Component {
  constructor() {
    super();
    this.state={icon: save}
  }

  componentDidMount() {
    getCards(this.props.spreadNumber)
      .then(cards => this.props.addCardsToStore(cards.cards))
      .then(() => this.fetchFortune())
      .catch(error => console.log(error))
  }

  fetchFortune = () => {
    let fortuneIndex = Math.floor(Math.random() * 100);
    getFortune()
      .then(fortunes => this.props.addFortuneToStore(fortunes[fortuneIndex].message))
      .then(() => this.addCurrentReading())
      .catch(error => console.log(error))
  }

  addCurrentReading = () => {
    let id = Date.now();
    let currentReading = {cards: this.props.cards, fortune: this.props.fortune, question: this.props.question, id: id, saved: false};
    this.props.addReadingToStore(currentReading);
  }

  updateSavedStatus = () => {
    return !this.props.currentReading.saved ? this.saveReading() : this.removeReading();
  }

  saveReading = () => {
    this.setState({icon: saved});
    this.props.currentReading.saved = true;
    this.props.addReadingToFavorites(this.props.currentReading);
  }

  removeReading = () => {
    this.setState({icon: save});
    this.props.currentReading.saved = false;
    this.props.removeReadingFromFavorites(this.props.currentReading);
  }

  determineIcon = () => {
    return this.props.currentReading.saved ? saved : save;
  }

  resetInfo = () => {
    this.props.resetQuestionInStore(this.props.question);
    this.props.removeCards(this.props.cards);
  }

  render() {

    return (
      !this.props.fortune ? <Loader /> :
      <section className='card-container fade-in'>
        <section className='cards'>
          {this.props.cards.map(card => {
            let number = this.props.cards.indexOf(card) + 1;
            return <Card key={card.name_short + card.value} card={card} number={number}/>
          })}
        </section>
        <section className='reading-details'>
          <button onClick={() => this.updateSavedStatus()} className="save-btn"><img src={this.determineIcon()} alt="save reading icon" className="save-icon"/></button>
          <div>
            <h2 className='question'>{this.props.currentReading.question}</h2>
            <h2>{this.props.fortune}</h2>
          </div>
        </section>
        <Link to='/home'><button onClick={() => this.resetInfo()} id='ask-another' className='back-btn'>Ask Another Question</button></Link>
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  cards: state.cards,
  question: state.question,
  fortune: state.fortune,
  currentReading: state.currentReading,
  spreadNumber: state.spreadNumber
})

export const mapDispatchToProps = dispatch => ({
  addCardsToStore: cards => (dispatch(addCards(cards))),
  addFortuneToStore: fortune => (dispatch(addFortune(fortune))),
  addReadingToStore: currentReading => (dispatch(addReading(currentReading))),
  removeCards: cards => (dispatch(removeCards(cards))),
  addReadingToFavorites: favorite => (dispatch(addFavorite(favorite))),
  removeReadingFromFavorites: favorite => (dispatch(removeFavorite(favorite))),
  resetQuestionInStore: question => (dispatch(removeQuestion(question)))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);

CardContainer.propTypes = {
  cards: PropTypes.array,
  question: PropTypes.string,
  fortune: PropTypes.string,
  currentReading: PropTypes.object,
  addCardsToStore: PropTypes.func,
  addFortuneToStore: PropTypes.func,
  addReadingToStore: PropTypes.func,
  removeCards: PropTypes.func,
  addReadingToFavorites: PropTypes.func,
  removeReadingFromFavorites: PropTypes.func,
  resetQuestionInStore: PropTypes.func,
}
