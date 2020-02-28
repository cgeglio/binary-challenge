import React from 'react';
import { Link } from 'react-router-dom';
import './About.scss';

const About = () => {
  return (
    <section className='about'>
      <h2>About Golden City Tarot</h2>
      <p>Golden City Tarot started in 1924 with a deck of cards and a dream. We are the premier destination for fortune telling in the Pacific Northwest. Tarot not your thing? We have crystal balls, palm reading, and aura reading, too. Remember, the future is golden at Golden City Tarot!</p>
      <h3>Visit Us</h3>
      <p>620 Treat Avenue</p>
      <p>San Francisco, CA 94110</p>
      <p>Phone: (415) 555-5555</p>
      <Link to='/home'><button className='back-btn'>Home</button></Link>
    </section>
  )
}

export default About;
