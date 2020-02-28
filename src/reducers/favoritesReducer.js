export const favorites = (state = [], action) => {
  switch(action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.favorite]
    case 'REMOVE_FAVORITE':
      let favorites = state.filter(favorite => favorite.id !== action.favorite.id);
      return favorites;
    case 'RESET_FAVORITES':
      return [];
    default:
      return state;
  }
}
