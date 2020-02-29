import React from 'react';
import './Card.scss';

const Card = ({ card, id}) => {
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
      <img src={process.env.PUBLIC_URL + `/cardAssets/GCT-gold.png`} alt="Tarot card" className='flip-card-front' />
      </div>
    </article>
  )
}

export default Card;
