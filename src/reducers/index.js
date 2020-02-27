import { combineReducers } from 'redux';
import { user } from './userReducer';
import { cards } from './cardsReducer';
import { question } from './questionReducer';
import { fortune } from './fortuneReducer';
import { currentReading } from './readingReducer';
import { favorites } from './favoritesReducer';

export const rootReducer = combineReducers({
  user,
  cards,
  question,
  fortune,
  currentReading,
  favorites
});
