export const cards = (state = [], action) => {
  switch(action.type) {
    case 'ADD_CARDS':
      return action.cards
    case 'REMOVE_CARDS':
      return []
    default:
      return state;
  }
}
