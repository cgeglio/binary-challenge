import React from 'react';
import './Loader.scss';
import stillLooking from '../../images/stillLooking.png';

const Loader = () => {
  return (
    <section className='loader' >
      <img src={stillLooking} alt="An eye with the words 'Still Looking'" className='loader-img heartbeat' />
    </section>
  )
}

export default Loader;
