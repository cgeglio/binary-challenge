import { combineReducers } from 'redux';
import { user } from './userReducer';
import { cards } from './cardsReducer';
import { question } from './questionReducer';
import { fortune } from './fortuneReducer';

export const rootReducer = combineReducers({
  user,
  cards,
  question,
  fortune
});
