export const question = (state = '', action) => {
  switch(action.type) {
    case 'ADD_QUESTION':
      return action.question
    default:
      return state;
  }
}
