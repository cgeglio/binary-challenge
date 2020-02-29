import React from 'react';
import { Link } from 'react-router-dom';
import './About.scss';
import { removeQuestion } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const About = (props) => {
  return (
    <section className='about fade-in'>
      <h2>About Golden City Tarot</h2>
      <p>Golden City Tarot started in 1924 with a deck of cards and a dream. We are the premier destination for fortune telling in the Pacific Northwest. Tarot not your thing? We have crystal balls, palm reading, and aura reading, too. Remember, the future is golden at Golden City Tarot!</p>
      <h3>Visit Us</h3>
      <p>620 Treat Avenue</p>
      <p>San Francisco, CA 94110</p>
      <p>Phone: (415) 555-5555</p>
      <Link to='/home'><button onClick={() => props.resetQuestion('question')}className='back-btn'>Home</button></Link>
    </section>
  )
}

export const mapDispatchToProps = dispatch => ({
  resetQuestion: question => (dispatch(removeQuestion(question)))
})

export default connect(null, mapDispatchToProps)(About);

About.propTypes = {
  resetQuestion: PropTypes.func
}
