import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';
import { connect } from 'react-redux';
import { logout, resetFavorites, removeCards, removeReading, removeFortune, removeQuestion } from '../../actions';
import logo from '../../images/GoldenCity.png';

export class Nav extends Component {

  handleLogout = () => {
    this.props.logoutUser(this.props.user);
    this.props.resetFavorites(this.props.favorites);
    this.props.removeCards(this.props.cards);
    this.props.removeQuestion(this.props.question);
    this.props.removeFortune(this.props.fortune);
    this.props.removeReading(this.props.currentReading);
  }

  render() {
    return (
      <section className='nav-bar'>
        <img src={logo} alt="Golden City Tarot Logo" className='logo-img'/>
        <div className='nav-btn-container'>
          <Link to='/deck'><button className='nav-btn'>DECK</button></Link>
          <Link to='/saved'><button className='nav-btn'>SAVED | {this.props.favorites.length || 0}</button></Link>
          {this.props.user.id ?
          <Link to='/'><button onClick={() => this.handleLogout()} id='logout-btn' className='nav-btn'>LOGOUT</button></Link>
          : <Link to='/'><button className='nav-btn'>LOGIN</button></Link>
          }
        </div>
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  favorites: state.favorites,
  question: state.question,
  fortune: state.fortune,
  cards: state.cards,
  currentReading: state.currentReading
})

export const mapDispatchToProps = dispatch => ({
  logoutUser: user => (dispatch(logout(user))),
  removeQuestion: question => (dispatch(removeQuestion(question))),
  removeFortune: fortune => (dispatch(removeFortune(fortune))),
  removeCards: cards => (dispatch(removeCards(cards))),
  removeReading: reading => (dispatch(removeReading(reading))),
  resetFavorites: favorites => (dispatch(resetFavorites(favorites))),
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
