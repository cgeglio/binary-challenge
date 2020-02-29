import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.scss';
import Form from '../Form/Form';
import Nav from '../Nav/Nav';
import ReadingStarter from '../../components/ReadingStarter/ReadingStarter';
import Deck from '../Deck/Deck';
import About from '../About/About';
import PreviewContainer from '../PreviewContainer/PreviewContainer';
import FavoriteContainer from '../FavoriteContainer/FavoriteContainer';
import CardContainer from '../CardContainer/CardContainer';
import { connect } from 'react-redux';
import banner from '../../images/banner.png';
import crystal from '../../images/crystal.png';


export class App extends Component {
  constructor() {
    super();
    this.state={cardContainerFlip: '', deckFlip: ''}
  }

  addCardContainerFlipId = () => {
    setTimeout(() => {
      this.setState({cardContainerFlip: 'on-flip'})
    }, 3000)
  }

  addDeckFlipId = () => {
    setTimeout(() => {
      this.setState({deckFlip: 'on-flip'})
    }, 3000)
  }

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
        {!this.props.user.username ? <Redirect to='/' /> :
          <>
          <Route exact path='/home'>
            {this.props.question ? <Redirect to='/reading' /> :
                <>
                  <Nav />
                  <ReadingStarter />
                </>
            }
          </Route>
          <Route exact path='/reading'>
            {!this.props.question ? <Redirect to='/home' /> :
              <>
                {this.addCardContainerFlipId()}
                <Nav />
                <CardContainer flipped={this.state.cardContainerFlip}/>
              </>
            }
          </Route>
          <Route exact path='/saved'>
            <>
              <Nav />
              <PreviewContainer />
            </>
          </Route>
          <Route exact path='/deck'>
            {this.addDeckFlipId()}
            <>
              <Nav />
              <Deck flipped={this.state.deckFlip}/>
            </>
          </Route>
          <Route exact path='/about'>
            <>
              <Nav />
              <About />
            </>
          </Route>
          <Route exact path='/saved/:id'>
            <>
              <Nav />
              <FavoriteContainer />
            </>
          </Route>
          </>
        }
      </main>
    )
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  cards: state.cards,
  question: state.question,
  currentReading: state.currentReading
})

export default connect(mapStateToProps)(App);
