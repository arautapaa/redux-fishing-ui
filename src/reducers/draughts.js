// users reducer
export default function draughts(state = {}, action) {
  switch (action.type) {
    case 'DRAUGHTS_LIST_SAVE':
      return action.draughts;
    case 'DRAUGHTS_SORT':
      const array = state.slice().sort(function(a, b) { 
        let fieldA, fieldB;

        if(action.field.indexOf(".") > -1) {
          const fieldSplit = action.field.split(".");

          fieldA = a[fieldSplit[0]][fieldSplit[1]];
          fieldB = b[fieldSplit[0]][fieldSplit[1]];
        } else {
          fieldA = a[action.field];
          fieldB = b[action.field];
        }

        const returnValue = action.desc ? 1 : -1;


      	if(fieldA < fieldB) {
      		return returnValue;
      	} else {
      		return -returnValue;
      	}
      });

      return array;

    // initial state
    default:
      return state;
  }
}