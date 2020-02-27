import React, { Component } from 'react';
import './CardContainer.scss';
import { connect } from 'react-redux';
import { getCards, getFortune } from '../../apiCalls';
import { addFavorite, removeFavorite, login, addCards, addFortune, addReading } from '../../actions';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import save from '../../images/save.png';
import saved from '../../images/saved.png';

class CardContainer extends Component {
  constructor() {
    super();
    this.state={icon: save}
  }

  componentDidMount() {
    getCards()
      .then(cards=> this.props.addCardsToStore(cards.cards))
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
    let currentReading = {cards: this.props.cards, fortune: this.props.fortune, question: this.props.question, id: id, saved: false}
    this.props.addReadingToStore(currentReading)
  }

  updateSavedStatus = () => {
    return this.state.icon === save ? this.saveReading() : this.removeReading();
  }

  saveReading = () => {
    this.setState({icon: saved});
    this.props.currentReading.saved = true;
    this.props.addReadingToFavorites(this.props.currentReading)
  }

  removeReading = () => {
    this.setState({icon: save});
    this.props.currentReading.saved = false;
    this.props.removeReadingFromFavorites(this.props.currentReading)
  }

  render() {
    return (
      !this.props.cards.length ? <Loader /> :
        <section className='card-container'>
          <section className='cards'>
            {this.props.cards.map(card => {
              return <Card key={card.name_short} card={card} />
            })}
          </section>
          <section className='reading-details'>
            <button onClick={() => this.updateSavedStatus()} className="save-btn"><img src={this.state.icon} alt="save reading icon" className="save-icon"/></button>
            <div>
              <h2 className='question'>{this.props.question}</h2>
              <h2>{this.props.fortune}</h2>
            </div>
          </section>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cards: state.cards,
  question: state.question,
  fortune: state.fortune,
  currentReading: state.currentReading
})

const mapDispatchToProps = dispatch => ({
  addCardsToStore: cards => (dispatch(addCards(cards))),
  addFortuneToStore: fortune => (dispatch(addFortune(fortune))),
  addReadingToStore: currentReading => (dispatch(addReading(currentReading))),
  addReadingToFavorites: favorite => (dispatch(addFavorite(favorite))),
  removeReadingFromFavorites: favorite => (dispatch(removeFavorite(favorite)))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)
