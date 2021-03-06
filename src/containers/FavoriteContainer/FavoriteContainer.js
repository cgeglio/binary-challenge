import React, { Component } from 'react';
import './FavoriteContainer.scss';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../../actions';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import save from '../../images/save.png';
import saved from '../../images/saved.png';
import PropTypes from 'prop-types';

export class FavoriteContainer extends Component {
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
      !this.props.currentReading.fortune ? <Loader /> :
      <section className='favorite-container fade-in'>
        <section className='cards'>
          {this.props.currentReading.cards.map(card => {
            let number = this.props.currentReading.cards.indexOf(card) + 1;
            return <Card key={card.name_short + card.name} card={card} number={number}/>
          })}
        </section>
        <section className='reading-details'>
          <button onClick={() => this.updateSavedStatus()} className="save-btn"><img src={this.determineIcon()} alt="save reading icon" className="save-icon"/></button>
          <div>
            <h2 className='question'>{this.props.currentReading.question}</h2>
            <h2>{this.props.currentReading.fortune}</h2>
          </div>
        </section>
        <Link to='/saved'><button className='back-btn'>Back to Saved</button></Link>
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  currentReading: state.currentReading
})

export const mapDispatchToProps = dispatch => ({
  addReadingToFavorites: favorite => (dispatch(addFavorite(favorite))),
  removeReadingFromFavorites: favorite => (dispatch(removeFavorite(favorite)))
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteContainer);

FavoriteContainer.propTypes = {
  currentReading: PropTypes.object,
  addReadingToFavorites: PropTypes.func,
  removeReadingFromFavorites: PropTypes.func
}
