import { call, put } from "redux-saga/effects";
import PlaceAPI from "../api/places";

// fetch the user's list
export function* getPlaces(action) {
  // call the api to get the users list
  const places = yield call(PlaceAPI.getPlaces);

  // save the users in state
  yield put({
    type: 'PLACE_LIST_SAVE',
    places: places,
  });
}

export function* savePlace(action) {
	yield call(PlaceAPI.savePlace, action.place);

	yield put({
		type : 'ADD_PLACE',
		place : action.place
	})
}