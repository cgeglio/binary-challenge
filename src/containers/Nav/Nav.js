import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';
import { connect } from 'react-redux';
import { logout, resetFavorites, removeReading, removeQuestion } from '../../actions';
import logo from '../../images/GoldenCity.png';
import PropTypes from 'prop-types';

export class Nav extends Component {

  handleLogout = () => {
    this.props.logoutUser(this.props.user);
    this.props.resetFavorites(this.props.favorites);
    this.props.removeQuestion(this.props.question);
    this.props.removeReading(this.props.currentReading);
  }

  render() {
    return (
      <section className='nav-bar'>
        <img src={logo} alt="Golden City Tarot Logo" className='logo-img'/>
        <div className='nav-btn-container'>
          <Link to='/about'><button className='nav-btn'>ABOUT</button></Link>
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
  currentReading: state.currentReading
})

export const mapDispatchToProps = dispatch => ({
  logoutUser: user => (dispatch(logout(user))),
  removeQuestion: question => (dispatch(removeQuestion(question))),
  removeReading: reading => (dispatch(removeReading(reading))),
  resetFavorites: favorites => (dispatch(resetFavorites(favorites))),
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

Nav.propTypes = {
  user: PropTypes.object,
  favorites: PropTypes.array,
  question: PropTypes.string,
  currentReading: PropTypes.object,
  logoutUser: PropTypes.func,
  removeQuestion: PropTypes.func,
  removeReading: PropTypes.func,
  resetFavorites: PropTypes.func
}
