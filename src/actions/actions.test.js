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

  it('should have a type ADD_CARDS', () => {
    const cards = [{name: 'The Magician', value: 11}]
    const expectedAction = {
      type: 'ADD_CARDS',
      cards
    }
    const result = actions.addCards(cards)
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

  it('should have a type ADD_FORTUNE', () => {
    const fortune = 'This too shall pass.'
    const expectedAction = {
      type: 'ADD_FORTUNE',
      fortune
    }
    const result = actions.addFortune(fortune)
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
})
