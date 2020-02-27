export const fortune = (state = '', action) => {
  switch(action.type) {
    case 'ADD_FORTUNE':
      return action.fortune
    default:
      return state;
  }
}
