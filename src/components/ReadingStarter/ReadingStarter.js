import React, { Component } from 'react';
import './ReadingStarter.scss';
import { connect } from 'react-redux';
import { addQuestion, addSpread } from '../../actions';
import golden from '../../images/golden.png';
import PropTypes from 'prop-types';

export class ReadingStarter extends Component {
  constructor() {
    super();
    this.state={question: '', spread: 4, error: null}
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  verifyQuestionInput = event => {
    event.preventDefault();
    let values = Object.values(this.state);
    values.includes('') ? this.setState({error: 'Please submit a question for your reading.'}) : this.startReading();
  }

  startReading = () => {
    this.props.updateSpreadNumber(this.state.spread)
    this.props.updateQuestion(this.state.question);
    this.setState({question: '', error: null});
  }

  render() {
    return (
      <section className='home-page fade-in'>
        <img src={golden} alt="The Future Is Golden" className='golden-text'/>
        <section className='form-container'>
          <div className='circle'></div>
          <form className='question-form'>
          <select name="spread" onChange={this.handleChange} >
            <option>Select reading...</option>
            <option value={4}>4 Card Reading</option>
            <option value={3}>3 Card Reading</option>
            <option value={1}>1 Card Reading</option>
          </select>
            <input
              type='text'
              placeholder='Enter a question...'
              name='question'
              maxLength= {55}
              value={this.state.question}
              onChange={this.handleChange}
            />
            <button onClick={this.verifyQuestionInput} className='ask-btn'>ASK THE CARDS</button>
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
  updateQuestion: question => (dispatch(addQuestion(question))),
  updateSpreadNumber: number => (dispatch(addSpread(number)))

})

export default connect(mapStateToProps, mapDispatchToProps)(ReadingStarter);

ReadingStarter.propTypes = {
  user: PropTypes.object,
  updateQuestion: PropTypes.func
}
