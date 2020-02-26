import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.scss';
import Form from '../Form/Form'
import Nav from '../Nav/Nav'
import Loader from '../../components/Loader/Loader'
import CardContainer from '../CardContainer/CardContainer'
import { connect } from 'react-redux'

export class App extends Component {

  render() {
    return (
      <main>
        <Route exact path="/">
          {this.props.user.username ? <Redirect to='/home' /> :
            <section className='login-page'>
              <Form />
            </section>
          }
        </Route>
        <Route exact path='/home'>
            <Nav />
            {!this.props.cards.length && <Loader />}
            <CardContainer />
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
