import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.scss';
import Form from '../Form/Form';
import Nav from '../Nav/Nav';
import Loader from '../../components/Loader/Loader';
import CardContainer from '../CardContainer/CardContainer';
import { connect } from 'react-redux';
import banner from '../../images/banner.png';
import crystal from '../../images/crystal.png';


export class App extends Component {

  render() {
    return (
      <main>
        <Route exact path="/">
          {this.props.user.username ? <Redirect to='/home' /> :
          <section className='login-page'>
            <img src={banner} alt="Your Fate Lies in Your Hands" className='banner-text'/>
            <Form />
            <img src={crystal} alt="Two hands holding a crystal ball" className='crystal-ball-img'/>
          </section>
          }
        </Route>
        <Route exact path='/home'>
            <Nav />

            <CardContainer />
            <p>hereeeeee</p>
        </Route>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cards: state.cards
})

export default connect(mapStateToProps)(App);


  // {!this.props.cards.length && <Loader />}
