export const question = (state = '', action) => {
  switch(action.type) {
    case 'ADD_QUESTION':
      return action.question
    case 'REMOVE_QUESTION':
      return ''
    default:
      return state;
  }
}
