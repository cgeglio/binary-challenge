export const spreadNumber = (state = 4, action) => {
  switch(action.type) {
    case 'ADD_SPREAD':
      return action.spreadNumber
    default:
      return state;
  }
}
