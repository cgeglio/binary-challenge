import React, { Component } from 'react';
import './ReadingStarter.scss';
import { connect } from 'react-redux';
import { addQuestion } from '../../actions'
import golden from '../../images/golden.png';

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
      <section className='home-page'>
        <img src={golden} alt="The Future Is Golden" className='golden-text'/>
      <section className='form-container'>
        <div className='circle'></div>
        <form className='question-form'>
          <input
            type='text'
            placeholder='Enter a question...'
            name='question'
            value={this.state.question}
            onChange={this.changeQuestion}
          />
          <button onClick={this.verifyInput} className='ask-btn'>ASK THE CARDS</button>
          <p className='error-message'>{this.state.error}</p>
        </form>
        </section>
      </section>
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
