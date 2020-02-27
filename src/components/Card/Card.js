import React from 'react';
import './Card.scss';

export const Card = ({ card }) => {
  console.log(card)
  return (
    <article>
      <img src={process.env.PUBLIC_URL + `/cardAssets/${card.name_short}.jpg`} alt="Tarot card" />
      <div className="overlay">
        <div className="card-details">
          <h3>{card.name}</h3>
          <h4>Meaning:</h4>
          <p>{card.meaning_up}</p>
          <h4>Description:</h4>
          <p>{card.desc}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
