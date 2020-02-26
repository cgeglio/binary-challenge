import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ReadingStarter.scss';
import { connect } from 'react-redux';
import { addQuestion } from '../../actions'

export class ReadingStarter extends Component {
  constructor() {
    super();
    this.state={question: '', error: null}
  }

  changeQuestion = event => {
    this.setState({question: event.target.value})
  }

  verifyInput = event => {
    event.preventDefault();
    let values = Object.values(this.state);
    values.includes('') ? this.setState({error: 'Please submit a question for your reading.'}) : this.startReading();
  }

  startReading = () => {
    this.props.updateQuestion(this.state.question);
    this.setState({question: '', error: null});
  }

  render() {
    return (
      <form className='question-form'>
        <h2>Ready For Your Reading?</h2>
        <h3>What question do you have for the cards?</h3>
        <input
          type='text'
          placeholder='Please enter a question...'
          name='question'
          value={this.state.question}
          onChange={this.changeQuestion}
        />
        <button onClick={this.verifyInput}>Submit</button>
        <p className='question-error-msg'>{this.state.error}</p>
      </form>
    )
  }
}

export const mapStateToProps = state => ({
  user: state.user
})

export const mapDispatchToProps = dispatch => ({
  updateQuestion: question => (dispatch(addQuestion(question)))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReadingStarter)
