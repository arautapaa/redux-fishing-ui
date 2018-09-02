import { call, put } from "redux-saga/effects";
import DraughtAPI from "../api/draughts";

// fetch the user's list
export function* getAllDraughts(action) {
  // call the api to get the users list
  const draughts = yield call(DraughtAPI.getAllDraughts);

  // save the users in state
  yield put({
    type: 'DRAUGHTS_LIST_SAVE',
    draughts: draughts,
  });
}

export function* getAllSelections(action) {
	const selections = yield call(DraughtAPI.getAllSelections);

	yield put({
		type : 'SELECTIONS_LIST_SAVE',
		selections : selections
	});
}