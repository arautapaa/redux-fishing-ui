// users reducer
export default function selections(state = {}, action) {
  switch (action.type) {
    case 'SELECTIONS_LIST_SAVE':
      return action.selections
    default:
      return state;
  }
}