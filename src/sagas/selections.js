import { call, put } from "redux-saga/effects";
import SelectionAPI from "../api/selections";

export function* getAllSelections(action) {
  const selections = yield call(SelectionAPI.getAllSelections);

  yield put({
    type : 'SELECTIONS_LIST_SAVE',
    selections : selections
  });
}


export function* addSelection(action) {

	console.log(action);

	yield call(SelectionAPI.saveSelection, action.selection);

	yield put({
		type : 'ADD_SELECTION',
		selection : action.selection
	})
}