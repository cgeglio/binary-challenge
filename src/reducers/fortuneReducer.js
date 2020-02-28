export const fortune = (state = '', action) => {
  switch(action.type) {
    case 'ADD_FORTUNE':
      return action.fortune
    case 'REMOVE_FORTUNE':
      return ''
    default:
      return state;
  }
}
