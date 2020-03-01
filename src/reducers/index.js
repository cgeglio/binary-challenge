import { combineReducers } from 'redux';
import { user } from './userReducer';
import { question } from './questionReducer';
import { currentReading } from './readingReducer';
import { favorites } from './favoritesReducer';
import { spreadNumber } from './spreadReducer';

export const rootReducer = combineReducers({
  user,
  question,
  currentReading,
  favorites,
  spreadNumber
});
