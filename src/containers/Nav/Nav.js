import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';
import { connect } from 'react-redux';
import { logout } from '../../actions';

export const Nav = (props) => {
  return (
    <section>
      <p>Logo</p>
      <button>Favorites</button>
      {props.user.id ?
      <Link to='/'><button onClick={() => props.logoutUser(props.user)}>Logout</button></Link>
      : <Link to='/'><button>Login</button></Link>
      }
    </section>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  logoutUser: user => (dispatch(logout(user)))
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
