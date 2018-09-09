const initialState = {
  entries: [],
  saving: false,
  activeField : {}
};
// users reducer
export default function places(state = initialState, action) {
	switch(action.type) {
		case "SAVING_PLACE":
			return {...state, saving: true}
		case "PLACE_LIST_SAVE":
			return {...state, entries : action.places}
		case "ADD_PLACE":
			return {...state, entries : [...state.entries, action.place], saving: false}
		case "SORT_PLACES":
			const array = state.entries.slice().sort(function(a, b) { 
		        let fieldA = a[action.field];
		        let fieldB = b[action.field];

		        const returnValue = action.desc ? 1 : -1;


		      	if(fieldA < fieldB) {
		      		return returnValue;
		      	} else {
		      		return -returnValue;
		      	}
		    });

		    return {...state, activeField : { field : action.field, desc : action.desc }, entries : array}
		default:
			return state;
	}
}