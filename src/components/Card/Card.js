import React from 'react';
import './Card.scss';

export const Card = ({ card }) => {
  return (
    <article>
      <img src={process.env.PUBLIC_URL + `/cardAssets/${card.name_short}.jpg`} alt="Tarot card" />
    </article>
  )
}

export default Card;
