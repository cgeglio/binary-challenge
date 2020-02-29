import React from 'react';
import './Loader.scss';
import crystal from '../../images/crystal.png';

const Loader = () => {
  return (
    <section className='loader pulsate-fwd' >
      <img src={crystal} alt="Two hands holding a crystal ball" className='crystal-ball-loader' />
      <h2 className='loader-msg'>Looking...</h2>
    </section>
  )
}

export default Loader;
