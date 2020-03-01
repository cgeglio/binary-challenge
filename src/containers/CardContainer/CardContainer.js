import React, { Component } from 'react';
import './CardContainer.scss';
import { connect } from 'react-redux';
import { getCards, getFortune } from '../../apiCalls';
import { addFavorite, removeFavorite, addReading, removeQuestion } from '../../actions';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import save from '../../images/save.png';
import saved from '../../images/saved.png';
import PropTypes from 'prop-types';

export class CardContainer extends Component {
  constructor() {
    super();
    this.state={icon: save, cards: []}
  }

  componentDidMount() {
    getCards(this.props.spreadNumber)
      .then(cards => this.setState(({cards: cards.cards})))
      .then(() => this.fetchFortune())
      .catch(error => console.log(error))
  }

  fetchFortune = () => {
    let fortuneIndex = Math.floor(Math.random() * 100);
    getFortune()
      .then(fortunes => this.addCurrentReading(fortunes[fortuneIndex].message))
      .catch(error => console.log(error))
  }

  addCurrentReading = (fortune) => {
    let id = Date.now();
    let currentReading = {cards: this.state.cards, fortune: fortune, question: this.props.question, id: id, saved: false};
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
  }

  render() {

    return (
      !this.props.currentReading.fortune ? <Loader /> :
      <section className='card-container fade-in'>
        <section className='cards'>
          {this.props.currentReading.cards.map(card => {
            let number = this.props.currentReading.cards.indexOf(card) + 1;
            return <Card key={card.name_short + card.value} card={card} number={number}/>
          })}
        </section>
        <section className='reading-details'>
          <button onClick={() => this.updateSavedStatus()} className="save-btn"><img src={this.determineIcon()} alt="save reading icon" className="save-icon"/></button>
          <div>
            <h2 className='question'>{this.props.currentReading.question}</h2>
            <h2>{this.props.currentReading.fortune}</h2>
          </div>
        </section>
        <Link to='/home'><button onClick={() => this.resetInfo()} id='ask-another' className='back-btn'>Ask Another Question</button></Link>
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  question: state.question,
  currentReading: state.currentReading,
  spreadNumber: state.spreadNumber
})

export const mapDispatchToProps = dispatch => ({
  addReadingToStore: currentReading => (dispatch(addReading(currentReading))),
  addReadingToFavorites: favorite => (dispatch(addFavorite(favorite))),
  removeReadingFromFavorites: favorite => (dispatch(removeFavorite(favorite))),
  resetQuestionInStore: question => (dispatch(removeQuestion(question)))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);

CardContainer.propTypes = {
  question: PropTypes.string,
  currentReading: PropTypes.object,
  spreadNumber: PropTypes.string,
  addReadingToStore: PropTypes.func,
  addReadingToFavorites: PropTypes.func,
  removeReadingFromFavorites: PropTypes.func,
  resetQuestionInStore: PropTypes.func,
}
