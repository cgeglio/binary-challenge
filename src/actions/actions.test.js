import * as actions from '../actions'

describe('actions', () => {
  it('should have a type LOGIN', () => {
    const user = {name: 'Robbie', id: 22}
    const expectedAction = {
      type: 'LOGIN',
      user
    }
    const result = actions.login(user)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type LOGOUT', () => {
    const user = {name: 'Robbie', id: 22}
    const expectedAction = {
      type: 'LOGOUT',
      user
    }
    const result = actions.logout(user)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type ADD_QUESTION', () => {
    const question = 'Is bithcuits a good kitty?'
    const expectedAction = {
      type: 'ADD_QUESTION',
      question
    }
    const result = actions.addQuestion(question)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type REMOVE_QUESTION', () => {
    const question = 'Is bithcuits a good kitty?'
    const expectedAction = {
      type: 'REMOVE_QUESTION',
      question
    }
    const result = actions.removeQuestion(question)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type ADD_READING', () => {
    const currentReading = {cards: [{name: 'The Magician'}], question: 'Is bithcuits a good kitty?', fortune: 'This too shall pass.', id: 44}
    const expectedAction = {
      type: 'ADD_READING',
      currentReading
    }
    const result = actions.addReading(currentReading)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type REMOVE_READING', () => {
    const currentReading = {cards: [{name: 'The Magician'}], question: 'Is bithcuits a good kitty?', fortune: 'This too shall pass.', id: 44}
    const expectedAction = {
      type: 'REMOVE_READING',
      currentReading
    }
    const result = actions.removeReading(currentReading)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type ADD_FAVORITE', () => {
    const favorite = {cards: [{name: 'The Magician'}], question: 'Is bithcuits a good kitty?', fortune: 'This too shall pass.', id: 44}
    const expectedAction = {
      type: 'ADD_FAVORITE',
      favorite
    }
    const result = actions.addFavorite(favorite)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type REMOVE_FAVORITE', () => {
    const favorite = {cards: [{name: 'The Magician'}], question: 'Is bithcuits a good kitty?', fortune: 'This too shall pass.', id: 44}
    const expectedAction = {
      type: 'REMOVE_FAVORITE',
      favorite
    }
    const result = actions.removeFavorite(favorite)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type RESET_FAVORITE', () => {
    const favorites = [{cards: [{name: 'The Magician'}], question: 'Is bithcuits a good kitty?', fortune: 'This too shall pass.', id: 44}]
    const expectedAction = {
      type: 'RESET_FAVORITES',
      favorites
    }
    const result = actions.resetFavorites(favorites)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type ADD_SPREAD', () => {
    const spreadNumber = 3;
    const expectedAction = {
      type: 'ADD_SPREAD',
      spreadNumber
    }
    const result = actions.addSpread(spreadNumber)
    expect(result).toEqual(expectedAction)
  })
})
