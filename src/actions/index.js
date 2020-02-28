export const login = user => ({
  type: 'LOGIN',
  user
})

export const logout = user => ({
  type: 'LOGOUT',
  user
})

export const addCards = cards => ({
  type: 'ADD_CARDS',
  cards
})

export const removeCards = cards => ({
  type: 'REMOVE_CARDS',
  cards
})

export const addQuestion = question => ({
  type: 'ADD_QUESTION',
  question
})

export const removeQuestion = question => ({
  type: 'REMOVE_QUESTION',
  question
})

export const addFortune = fortune => ({
  type: 'ADD_FORTUNE',
  fortune
})

export const removeFortune = fortune => ({
  type: 'REMOVE_FORTUNE',
  fortune
})

export const addReading = currentReading => ({
  type: 'ADD_READING',
  currentReading
})

export const removeReading = currentReading => ({
  type: 'REMOVE_READING',
  currentReading
})

export const addFavorite = favorite => ({
  type: 'ADD_FAVORITE',
  favorite
})

export const removeFavorite = favorite => ({
  type: 'REMOVE_FAVORITE',
  favorite
})

export const resetFavorites = favorites => ({
  type: 'RESET_FAVORITES',
  favorites
})
