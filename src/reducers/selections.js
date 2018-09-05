const initState = {

}

// users reducer
export default function selections(state = initState, action) {
  switch (action.type) {
    case 'SELECTIONS_LIST_SAVE':
      return action.selections;
    case 'ADD_SELECTION': 
      const selections = state;

      selections[action.selection.type].push(action.selection);

      return selections;
    default:
      return state;
  }
}