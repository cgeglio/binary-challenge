import React, { Component } from 'react';
import './FavoriteContainer.scss';
import { connect } from 'react-redux';
import { getCards, getFortune } from '../../apiCalls';
import { addFavorite, removeFavorite, addCards, addFortune } from '../../actions';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import save from '../../images/save.png';
import saved from '../../images/saved.png';

class FavoriteContainer extends Component {
  constructor() {
    super();
    this.state={icon: save}
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

  render() {

    return (
      !this.props.fortune ? <Loader /> :
        <section className='favorite-container'>
          <section className='cards'>
            {this.props.currentReading.cards.map(card => {
              return <Card key={card.name_short} card={card} />
            })}
          </section>
          <section className='reading-details'>
            <button onClick={() => this.updateSavedStatus()} className="save-btn"><img src={this.determineIcon()} alt="save reading icon" className="save-icon"/></button>
            <div>
              <h2 className='question'>{this.props.currentReading.question}</h2>
              <h2>{this.props.currentReading.fortune}</h2>
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
  addReadingToFavorites: favorite => (dispatch(addFavorite(favorite))),
  removeReadingFromFavorites: favorite => (dispatch(removeFavorite(favorite)))
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteContainer)
