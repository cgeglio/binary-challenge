export const currentReading = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_READING':
      return action.currentReading
    default:
      return state;
  }
}
