import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import logo from '../../images/GoldenCity.png';

export const Nav = (props) => {
  return (
    <section className='nav-bar'>
      <img src={logo} alt="Golden City Tarot Logo" className='logo-img'/>
      <div className='nav-btn-container'>
        <Link to='/saved'><button className='nav-btn'>SAVED | {props.favorites.length || 0}</button></Link>
        {props.user.id ?
        <Link to='/'><button onClick={() => props.logoutUser(props.user)} id='logout-btn' className='nav-btn'>LOGOUT</button></Link>
        : <Link to='/'><button className='nav-btn'>LOGIN</button></Link>
        }
      </div>
    </section>
  )
}

export const mapStateToProps = state => ({
  user: state.user,
  favorites: state.favorites
})

export const mapDispatchToProps = dispatch => ({
  logoutUser: user => (dispatch(logout(user)))
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
