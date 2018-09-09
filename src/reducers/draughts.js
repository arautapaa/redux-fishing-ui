
const initialState = {
  draughts: [],
  saved: false,
  saving: false,
  loading: true,
  updated: false,
  deleted: false,
  redirect: false,
  init : true,
  activeField : {}
};
// users reducer
export default function draughts(state = initialState, action) {
  switch (action.type) {
    case 'RESET_REDIRECT':
      return {...state, redirect: false}
    case 'DELETE_READY':
      return {...state, deleted: false, redirect : true}
    case 'DRAUGHT_DELETED':
      const items = state.draughts.filter((item) => {
          return item.id != action.id;
      });

      return {...state, draughts: items, deleted: true}
    case 'DRAUGHTS_LOADING':
      return {...state, loading: true}
    case 'DRAUGHT_ADD':
      return {...state, draughts: [...state.draughts, action.draught]}
    case 'COPY_NEW_DRAUGHT':
      return {...state, saving: false, saved: false}
    case 'SAVING_DRAUGHT':
      return {...state, saving : true}
    case 'DRAUGHT_UPDATED':
      const draughts = state.draughts.map(draught =>
        draught.id == action.draught.id ? {...action.draught} : draught
      );

      return {...state, draughts : draughts, updated : true}
    case 'UPDATE_COMPLETE':
      return {...state, updated : false}
    case 'SAVE_DRAUGHT':
      return {...state, draughts: [action.draught, ...state.draughts], saved : true, saving: false}
    case 'DRAUGHTS_LIST_SAVE':
      return {...state, draughts: action.draughts, loading : false};
    case 'DRAUGHTS_SORT':
      const array = state.draughts.slice().sort(function(a, b) { 
        let fieldA, fieldB;

        if(action.field.indexOf(".") > -1) {
          const fieldSplit = action.field.split(".");

          fieldA = a[fieldSplit[0]][fieldSplit[1]];
          fieldB = b[fieldSplit[0]][fieldSplit[1]];
        } else {
          fieldA = a[action.field];
          fieldB = b[action.field];
        }

        if(typeof fieldA == 'string') {
          fieldA = fieldA.toUpperCase();
          fieldB = fieldB.toUpperCase();
        }

        const returnValue = action.desc ? 1 : -1;


      	if(fieldA < fieldB) {
      		return returnValue;
      	} else if(fieldA > fieldB){
      		return -returnValue;
      	} else {
          return 0;
        }
      });



      return {...state, draughts : array, activeField : { field : action.field, desc : action.desc }, init : false};
    // initial state
    default:
      return state;
  }
}