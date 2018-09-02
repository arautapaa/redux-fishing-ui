import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { getAllDraughts, getAllSelections  } from './draughts.js';

// main saga generators
export function* sagas() {
	yield [
		fork(takeLatest, 'DRAUGHTS_GET_ALL', getAllDraughts),
  		fork(takeLatest, 'SELECTIONS_GET_ALL', getAllSelections)
  	]
  }
