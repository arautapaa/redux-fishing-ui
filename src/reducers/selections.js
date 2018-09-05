const initState = {

}

// users reducer
export default function selections(state = initState, action) {
  switch (action.type) {
    case 'SELECTIONS_LIST_SAVE':
      return action.selections;
    case 'ADD_SELECTION': 
      let selections = {...state.selections};

	  const selectionList = selections[action.selection.type].slice();

	  selectionList.push(action.selection);

	  selections[action.selection.type] = selectionList;


      return {...state, selections : selections};
    default:
      return state;
  }
}