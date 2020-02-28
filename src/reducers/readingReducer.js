export const currentReading = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_READING':
      return action.currentReading
    case 'REMOVE_READING':
      return {}
    default:
      return state;
  }
}
