import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import './Deck.scss';
import { getDeck } from '../../apiCalls';
import Card from '../../components/Card/Card';
import { removeQuestion } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export class Deck extends Component {
  constructor() {
    super();
    this.state={deck: []}
  }

  componentDidMount() {
    getDeck()
      .then(deck => this.setState({deck: deck.cards}))
      .catch(error => console.log(error))
  }

  render() {
    return (
      !this.state.deck.length ? <Loader /> :
      <section className='deck'>
        <h2 className='deck-title'>The Tarot Deck</h2>
        <div className='btn-container'><Link to='/home'><button onClick={() => this.props.resetQuestion('question')} className='back-btn'>Home</button></Link></div>
        {this.state.deck.map(card => {
          let number = Math.floor(1 + Math.random() * 4);
          return <Card key={card.name_short+card.name_short} card={card} number={number}/>
        })}
      </section>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  resetQuestion: question => (dispatch(removeQuestion(question)))
})

export default connect(null, mapDispatchToProps)(Deck);

Deck.propTypes = {
  resetQuestion: PropTypes.func
}
