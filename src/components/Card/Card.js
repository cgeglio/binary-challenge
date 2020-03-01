import React from 'react';
import './Card.scss';
import PropTypes from 'prop-types';

const Card = ({ card, id, number}) => {
  return (
    <article className='flip-card fade-in'>
      <div className='flip-card-inner' id={id}>
      <img src={process.env.PUBLIC_URL + `/cardAssets/${card.name_short}.jpg`} alt="Tarot card" className='flip-card-back' />
      <div className="overlay">
        <div className="card-details">
          <h3>{card.name}</h3>
          <h4>Meaning:</h4>
          <p>{card.meaning_up}</p>
          <h4>Description:</h4>
          <p>{card.desc}</p>
        </div>
      </div>
      <img src={process.env.PUBLIC_URL + `/cardAssets/card${number}.png`} alt="Tarot card" className='flip-card-front' />
      </div>
    </article>
  )
}

export default Card;

Card.propTypes = {
  card: PropTypes.object,
  id: PropTypes.string
}
